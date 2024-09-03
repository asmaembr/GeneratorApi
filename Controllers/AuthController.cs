using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using generator_API.Data;
using generator_API.DTOs;
using generator_API.Helpers;
using generator_API.Models.utilisateur;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using quickemail_backend.Data.Dtos;
using quickemail_backend.Models.utilisateur;

namespace generator_API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AuthController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly ILogger<AuthController> _logger;
        private readonly IConfiguration _configuration;

        
        private  AesEncryptionHelper aeshelper = new AesEncryptionHelper();
        private TokenHelper TokenHelper = new TokenHelper();
        public AuthController( ILogger<AuthController> logger, IConfiguration configuration, ApplicationDbContext context)
        {
            _logger = logger;
            _configuration = configuration;
            _context = context;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginDto model)
        {

            var user = _context.Utilisateurs.FirstOrDefault(u => u.UserName == model.UserName || u.Email == model.UserName);
            if (user == null)
            { return NotFound(); }
            else if( aeshelper.Decrypt(user.PasswordHash) == model.Password){
                
                string  token = TokenHelper.CreateToken(user);
                 var dto = new LoggedInDto
                {  
                    Username = user.UserName,
                    Token = token,
                    Type = user.GetType().Name == "Administrateur" ? TypeUser.Administrateur 
                    : user.GetType().Name == "Speciale" ? TypeUser.Speciale 
                    : TypeUser.Normale,
                };
                var userCategories = _context.Categories
                             .Where(c => c.Utilisateurs.Contains(user))
                             .Select(c => c.Id)
                             .ToList();

                foreach (var catId in userCategories)
                { dto.Categories.Add(catId); }


                return Ok(dto);
            }
            else
            { return NotFound(); }
                
         }

        [HttpPost]
        public IActionResult Logout()
        {
            return Ok();
        }


        
    }
}