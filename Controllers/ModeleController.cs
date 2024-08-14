using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using generator_API.Data;
using generator_API.DTOs;
using generator_API.Models.modele;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using quickemail_backend.Models;

namespace generator_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class ModeleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        
        private readonly ILogger<UtilisateurController> _logger;
        public ModeleController(  ILogger<UtilisateurController> logger ,ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        [ActionName("")]
        public List<ModeleDto> GetAll([FromBody] LoggedInDto userdto)
        {
            var modeles = _context.Modeles.Include(m => m.Categorie).Include(m => m.Variables).ToList();
            var user = _context.Utilisateurs.Include(u=>u.Categories).Where(u => u.UserName == userdto.Username).FirstOrDefault()!;
            List<ModeleDto> modeleDtos = new List<ModeleDto>();
            foreach( var modele in modeles)
            {
                bool hasCommonCategory = false;
                foreach (var category in user.Categories)
                {
                    if (modele.Categorie == category)
                    {
                        hasCommonCategory = true;
                        break;
                    }
                }

                if (modele.Publier && hasCommonCategory)
                {
                    var dto = new ModeleDto
                    {
                        Id = modele.Id,
                        Nom = modele.Nom,
                        Publier = modele.Publier,
                        Contenu = modele.Contenu,
                        CategorieId = modele.Categorie.Id,
                       Type = modele.GetType().Name == "Lettre" ? TypeModele.LETTRE : TypeModele.COURRIEL,
                    };
                    var modeleVar = modele.Variables.Select(v=>v.Id).ToList();
                    foreach (var varID in modeleVar)
                    {
                        dto.Variables.Add(varID);
                    }
                    modeleDtos.Add(dto);
                }
                else {
                     if(modele.userId == user.Id)
                     {
                        var dto = new ModeleDto
                        {
                            Id = modele.Id,
                            Nom = modele.Nom,
                            Publier = modele.Publier,
                            Contenu = modele.Contenu,
                            CategorieId = modele.Categorie.Id,
                         Type = modele.GetType().Name == "Lettre" ? TypeModele.LETTRE : TypeModele.COURRIEL,
                        };
                        var modeleVar = modele.Variables.Select(v=>v.Id).ToList();
                        foreach (var varID in modeleVar)
                        {
                            dto.Variables.Add(varID);
                        }
                        modeleDtos.Add(dto);
                     }
                }
            }

            return modeleDtos;
        }


        [HttpGet("{id}")]
        public IActionResult Form(int id)

        {
            Modele modele = _context.Modeles.Include(v=> v.Categorie).Include(m=>m.Variables).FirstOrDefault(m => m.Id == id)!;
            if (modele == null)
            {
                return NotFound();
            }
            
            var dto = new ModeleDto{
                Id = modele.Id,
                Nom = modele.Nom,
                Contenu = modele.Contenu,
                Publier = modele.Publier,
                CategorieId = modele.Categorie.Id,
                Type = modele.GetType().Name == "Courriel" ? TypeModele.COURRIEL : TypeModele.LETTRE,
            };
            var modeleVar = modele.Variables.Select(v=>v.Id).ToList();
            foreach (var varID in modeleVar)
            {
                dto.Variables.Add(varID);
            }
            return Ok(dto);
        }
        

        [HttpPost]
        public IActionResult FormVar([FromBody] ModeleDto modeleDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(modeleDto==null)
            {
                return BadRequest();
            }
            var user = _context.Utilisateurs.Include(u=>u.Categories).Where(u => u.UserName == modeleDto.Username).FirstOrDefault();
            if(user == null)
            {
                return NotFound();
            }

            var modele = _context.Modeles.Include(v=> v.Categorie).Include(v => v.Variables).FirstOrDefault(m => m.Id == modeleDto.Id);
            //create new modele
            if(modele == null)
            {
                if(_context.Modeles.Any(m => m.Nom == modeleDto.Nom))
                {
                    return BadRequest();
                }
                if(modeleDto.Type == TypeModele.LETTRE)
                {
                    modele = new Lettre
                    {
                        Nom = modeleDto.Nom,
                        Publier = modeleDto.Publier,
                        Contenu = modeleDto.Contenu,
                        Categorie = _context.Categories.FirstOrDefault(c => c.Id == modeleDto.CategorieId)!,
                        userId = user.Id,
                    };
                     foreach (var id in modeleDto.Variables)
                {
                    var variable = _context.Variables.Find(id);
                    if(variable != null)
                    {
                        modele.Variables.Add(variable);
                    }
                }
                }
                else 
                {
                    modele = new Courriel
                    {
                        Nom = modeleDto.Nom,
                        Publier = modeleDto.Publier,
                        Contenu = modeleDto.Contenu,
                        Categorie = _context.Categories.FirstOrDefault(c => c.Id == modeleDto.CategorieId)!,
                        userId = user.Id,
                    };
                     foreach (var id in modeleDto.Variables)
                {
                    var variable = _context.Variables.Find(id);
                    if(variable != null)
                    {
                        modele.Variables.Add(variable);
                    }
                }
                }
               
                _context.Modeles.Add(modele);
                _context.SaveChanges();
                return Ok();
            }

            //update modele
            else {
            
            Modele existingmodele = _context.Modeles.Include(v=> v.Categorie).Include(v => v.Variables).FirstOrDefault(m => m.Id == modeleDto.Id)!;

            if(existingmodele.GetType().Name != modeleDto.Type.ToString())
                {
                    _context.Modeles.Remove(existingmodele);
                    _context.SaveChanges();
                    Modele newModele;

                    if(modeleDto.Type == TypeModele.LETTRE)
                    {
                        newModele = new Lettre
                        {
                            Nom = modeleDto.Nom,
                            Publier = modeleDto.Publier,
                            Contenu = modeleDto.Contenu,
                            Categorie = _context.Categories.FirstOrDefault(c => c.Id == modeleDto.CategorieId)!,
                            userId = user.Id,
                        };
                    }
                    else 
                    {
                        newModele = new Courriel
                        {
                            Nom = modeleDto.Nom,
                            Publier = modeleDto.Publier,
                            Contenu = modeleDto.Contenu,
                            Categorie = _context.Categories.FirstOrDefault(c => c.Id == modeleDto.CategorieId)!,
                            userId = user.Id,
                        };
                    }

                // Add new variables
                foreach (var id in modeleDto.Variables)
                {
                    var variable = _context.Variables.Find(id);
                    if(variable != null)
                    {
                        newModele.Variables.Add(variable);
                    }
                }

                _context.Modeles.Add(newModele);
                _context.SaveChanges();
                }

            else {

                    existingmodele.Nom = modeleDto.Nom;
                    existingmodele.Publier = modeleDto.Publier;
                    existingmodele.Contenu = modeleDto.Contenu;
                    existingmodele.Categorie = _context.Categories.FirstOrDefault(c => c.Id == modeleDto.CategorieId)!;
                    existingmodele.userId = user.Id;
                    
                    // Remove existing variables
                    var existingVariableIds = existingmodele.Variables.Select(v => v.Id).ToList();
                    foreach (var variableId in existingVariableIds)
                    {
                        var variable = _context.Variables.Find(variableId);
                        if (variable != null)
                        {
                            modele.Variables.Remove(variable);
                        }
                    }
                    // Add new variables
                    foreach (var id in modeleDto.Variables)
                    {
                        var variable = _context.Variables.Find(id);
                        if(variable != null)
                        {
                            modele.Variables.Add(variable);
                        }
                    }
                    _context.Modeles.Update(existingmodele);
                    _context.SaveChanges();
                }
                
                return Ok();
            }
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var modele = _context.Modeles.Find(id);
            if (modele == null)
            {
                return NotFound();
            }
            _context.Modeles.Remove(modele);
            _context.SaveChanges();
            return Ok();
        }




    }
}