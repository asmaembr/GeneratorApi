using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using generator_API.Data;
using generator_API.DTOs;
using generator_API.Models.variable;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using quickemail_backend.Models;

namespace generator_API.Controllers
{   
    [Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class VariableController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        
        private readonly ILogger<UtilisateurController> _logger;
        public VariableController(  ILogger<UtilisateurController> logger ,ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpPost]
        [ActionName("")]
        public List<VariableDto> GetAll([FromBody] LoggedInDto userdto)
        {
    
        var variables = _context.Variables.Include(u => u.Categories).ToList();

        var user = _context.Utilisateurs.Where(u => u.UserName == userdto.Username).FirstOrDefault();

        List<VariableDto> variableDtos = new List<VariableDto>();

        foreach (var variable in variables)
        {
            bool hasCommonCategory = false;
            foreach (var category in variable.Categories)
            {
                if (userdto.Categories.Contains(category.Id))
                {
                    hasCommonCategory = true;
                    break;
                }
            }
            if (variable.Publier && hasCommonCategory)
            {
                var dto = new VariableDto
                {  
                    Id = variable.Id,
                    Nom = variable.Nom,
                    Formule = variable.Formule,
                    Publier = variable.Publier,
                    Type = variable.Type,
                    Nature = variable.Nature,
                };
                 var varcategories = _context.Categories
                                    .Where(c => c.Variables.Contains(variable))
                                    .Select(c => c.Id)
                                    .ToList();

                foreach (var catId in varcategories)
                { dto.Categories.Add(catId); }

                variableDtos.Add(dto);
            }
            else
            {
                if (variable.userId == user!.Id)
                {
                    var dto = new VariableDto
                    {
                        Id = variable.Id,
                        Nom = variable.Nom,
                        Formule = variable.Formule,
                        Publier = variable.Publier,
                        Type = variable.Type,
                        Nature = variable.Nature,
                    };
                    var varcategories = _context.Categories
                                    .Where(c => c.Variables.Contains(variable))
                                    .Select(c => c.Id)
                                    .ToList();

                     foreach (var catId in varcategories)
                    { dto.Categories.Add(catId); }

                    variableDtos.Add(dto);
                }
            }
        }

            
            return variableDtos;
        }

        [HttpGet("{id}")]
        public IActionResult Form(int id)
        {
            Variable variable = _context.Variables.Include(v => v.Categories).FirstOrDefault(v => v.Id == id)!;
            if (variable == null)
            {
                return NotFound();
            }
            var dto = new VariableDto
            {
                Id = variable.Id,
                Nom = variable.Nom,
                Formule = variable.Formule,
                Publier = variable.Publier,
                Type = variable.Type,
                Nature = variable.Nature,
            };
           var varcategories = variable.Categories.Select(c => c.Id).ToList();
          
            foreach (var catId in varcategories)
            { dto.Categories.Add(catId); }
            return Ok(dto);
        }

        [HttpPost]
        public IActionResult Form([FromBody] VariableDto variableDTO)
        {    
           
            if(variableDTO == null)
            {
                return BadRequest();
            }
            var user = _context.Utilisateurs.Where(u => u.UserName == variableDTO.Username).FirstOrDefault();
            if(user == null)
            {
                return NotFound();
            }
            var variable = _context.Variables.Include(v => v.Categories).FirstOrDefault(v => v.Id == variableDTO.Id);
            if (variable == null)
            {   
                if(_context.Variables.Any(v => v.Nom == variableDTO.Nom))
                {
                    return BadRequest();
                }
                variable = new Variable
                {
                    Nom = variableDTO.Nom,
                    Formule = variableDTO.Formule,
                    Publier = variableDTO.Publier,
                    Type = variableDTO.Type,
                    Nature = variableDTO.Nature,
                    userId = user.Id,
                };
                foreach (var id in variableDTO.Categories)
                {
                var category = _context.Categories.Find(id);

                    if (category != null)
                    {
                            variable.Categories.Add(category);
                    }
                }

                _context.Variables.Add(variable);
                _context.SaveChanges();
                return Ok();
            }
            //update
            else {
                    variable.Nom = variableDTO.Nom;
                    variable.Formule = variableDTO.Formule;
                    variable.Publier = variableDTO.Publier;
                    variable.Type = variableDTO.Type;
                    variable.Nature = variableDTO.Nature;
                    variable.userId = user.Id;
                // Remove existing categories
                var existingCategoryIds = variable.Categories.Select(c => c.Id).ToList();
                foreach (var categoryId in existingCategoryIds)
                    {
                        var category = _context.Categories.Find(categoryId);
                        if (category != null)
                        {
                            variable.Categories.Remove(category);
                        }
                    }
                // Add new categories
                foreach (var categoryId in variableDTO.Categories)
                    {
                        var category = _context.Categories.Find(categoryId);
                        if (category != null)
                        {
                            variable.Categories.Add(category);
                        }
                    }
                _context.Variables.Update(variable);
                _context.SaveChanges();
                return Ok();
        }

    }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var variable = _context.Variables.Find(id);
            if (variable == null)
            {
                return NotFound();
            }
            _context.Variables.Remove(_context.Variables.Find(id)!);
            _context.SaveChanges();
            return Ok();
        }
}
}