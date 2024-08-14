using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using generator_API.Data;
using generator_API.DTOs;
using generator_API.Helpers;
using generator_API.Models.utilisateur;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using quickemail_backend.Data.Dtos;
using quickemail_backend.Models;
using quickemail_backend.Models.utilisateur;

namespace generator_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class UtilisateurController : ControllerBase
    {
        private  ApplicationDbContext _context { get; set; }
        
        private readonly ILogger<UtilisateurController> _logger;
        private  AesEncryptionHelper aeshelper = new AesEncryptionHelper();    
        
        public UtilisateurController(  ILogger<UtilisateurController> logger , ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }
        
        [HttpGet]
        [ActionName("")]
        public List<UtilisateurDto>GetAll()
        {
            var users = _context.Utilisateurs.ToList();
            List<UtilisateurDto> utilisateurDtos = new List<UtilisateurDto>();
            foreach (var user in users)
            {
               var dto = new UtilisateurDto
                {  
                    Id = user.Id,
                    Username = user.UserName,
                    Nom = user.Nom,
                    Type = _context.Entry(user).Metadata.GetDiscriminatorValue()!.ToString() == "Administrateur" ? TypeUser.Administrateur 
                    : _context.Entry(user).Metadata.GetDiscriminatorValue()!.ToString() == "Speciale" ? TypeUser.Speciale 
                    : TypeUser.Normale,
                    Email = user.Email,
                    Password = aeshelper.Decrypt(user.PasswordHash),
               
                };
                var userCategories = _context.Categories
                             .Where(c => c.Utilisateurs.Contains(user))
                             .Select(c => c.Id)
                             .ToList();

                foreach (var catId in userCategories)
                { dto.Categories.Add(catId); }

                utilisateurDtos.Add(dto);
            }
            return utilisateurDtos;
        }
        
        [HttpGet("{id}")]
        public IActionResult Form(string id)
        {
            var user = _context.Utilisateurs.Find(id);
            if (user == null){return NotFound();}

            var utilisateurDto = new UtilisateurDto
            {
                Id = user.Id,
                Username = user.UserName,
                Nom = user.Nom,
                Type = user.GetType().Name == "Administrateur" ? TypeUser.Administrateur 
                            : user.GetType().Name == "Speciale" ? TypeUser.Speciale 
                            : TypeUser.Normale,
                Email = user.Email,
                Password = aeshelper.Decrypt(user.PasswordHash),
            
            };
            var userCategories = _context.Categories
                                    .Where(c => c.Utilisateurs.Contains(user))
                                    .Select(c => c.Id)
                                    .ToList();

            foreach (var catId in userCategories)
                { utilisateurDto.Categories.Add(catId); }


            return Ok(utilisateurDto);
        }


        [HttpPost]
        public IActionResult Form([FromBody] UtilisateurDto userDto)
        {
            
        if (userDto == null)
            {
                return NotFound();
            }
      
            //update    
            if (_context.Utilisateurs.Find(userDto.Id) != null)
        {
                Utilisateur existingUser = _context.Utilisateurs.Include(u => u.Categories).FirstOrDefault(u => u.Id == userDto.Id)!;

                if (userDto.Type.ToString() != existingUser.GetType().Name)
                {
                    _context.Utilisateurs.Remove(existingUser);
                    _context.SaveChanges();
                    Utilisateur newUser;
                    if (userDto.Type == TypeUser.Administrateur)
                    {
                        newUser = new Administrateur
                        {
                            Id = userDto.Id,
                            UserName = userDto.Username,
                            Email = userDto.Email,
                            Nom = userDto.Nom,
                            PasswordHash = aeshelper.Encrypt(userDto.Password)
                        };
                    }
                    else if (userDto.Type == TypeUser.Speciale)
                    {
                        newUser = new Speciale
                        {
                            Id = userDto.Id,
                            UserName = userDto.Username,
                            Email = userDto.Email,
                            Nom = userDto.Nom,
                            PasswordHash = aeshelper.Encrypt(userDto.Password)
                        };
                    }
                    else
                    {
                        newUser = new Normale
                        {
                            Id = userDto.Id,
                            UserName = userDto.Username,
                            Email = userDto.Email,
                            Nom = userDto.Nom,
                            PasswordHash = aeshelper.Encrypt(userDto.Password)
                        };
                    }

                    // Remove old categories
                var newuserCategoryIds = newUser.Categories.Select(c => c.Id).ToList();
                foreach (var categoryId in newuserCategoryIds)
                    {
                        var category = _context.Categories.Find(categoryId);
                        if (category != null)
                        {
                            newUser.Categories.Remove(category);
                        }
                    }
                    // Add new categories
                    foreach (var categoryId in userDto.Categories)
                    {
                        var category = _context.Categories.Find(categoryId);
                        if (category != null)
                        {
                            newUser.Categories.Add(category);
                        }
                    }
                    _context.Utilisateurs.Add(newUser);
                    _context.SaveChanges();

                }
                else {
                    
                existingUser.UserName = userDto.Username;
                existingUser.Email = userDto.Email;
                existingUser.Nom = userDto.Nom;
                existingUser.PasswordHash = aeshelper.Encrypt(userDto.Password);

                // Remove old categories
                var existingCategoryIds = existingUser.Categories.Select(c => c.Id).ToList();
                foreach (var categoryId in existingCategoryIds)
                    {
                        var category = _context.Categories.Find(categoryId);
                        if (category != null)
                        {
                            existingUser.Categories.Remove(category);
                        }
                    }
                // Add new categories
                foreach (var categoryId in userDto.Categories)
                    {
                        var category = _context.Categories.Find(categoryId);
                        if (category != null)
                        {
                            existingUser.Categories.Add(category);
                        }
                    }

                _context.Utilisateurs.Update(existingUser);
                _context.SaveChanges();
                }
                return Ok();
            }

         else
            //create
            {
                if (_context.Utilisateurs.Any(u => u.Email == userDto.Email || u.UserName == userDto.Username))
                {
                    return BadRequest();
                }

                Utilisateur user;
                
                if (userDto.Type == TypeUser.Administrateur)
                {
                    user = new Administrateur
                    {
                        UserName = userDto.Username,
                        Email = userDto.Email,
                        Nom = userDto.Nom,
                        PasswordHash =aeshelper.Encrypt(userDto.Password) 
                    };
                }
                else if (userDto.Type == TypeUser.Speciale)
                {
                    user = new Speciale
                    {
                        UserName = userDto.Username,
                        Email = userDto.Email,
                        Nom = userDto.Nom,
                        PasswordHash =aeshelper.Encrypt(userDto.Password) 
                    };
                }
                else
                {
                    user = new Normale
                    {
                        UserName = userDto.Username,
                        Email = userDto.Email,
                        Nom = userDto.Nom,
                        PasswordHash =aeshelper.Encrypt(userDto.Password) 
                    };
                }
                foreach (var id in userDto.Categories)
                {
                    var category = _context.Categories.Find(id);
                    if (category != null)
                    {
                        user.Categories.Add(category);
                    }
                }

                _context.Utilisateurs.Add(user);
                _context.SaveChanges();
                return Ok();
            }
        }

        

        [HttpDelete("{id}")]
        public IActionResult Delete( string id )
        {
            if(_context.Utilisateurs.Find(id) == null)
                    {
                        return NotFound();
                    }
                    _context.Utilisateurs.Remove(_context.Utilisateurs.Find(id)!);
                    _context.SaveChanges();
                    return Ok();
        }
 






    }

}