using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using generator_API.Data;
using generator_API.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using quickemail_backend.Models;

namespace generator_API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]/[action]")]
    public class CategorieController : ControllerBase
    {
        private  ApplicationDbContext _context { get; set; }
        private readonly ILogger<CategorieController> _logger;
        public CategorieController(ApplicationDbContext context, ILogger<CategorieController> logger)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet] 
        [ActionName("")]
        public List<CategorieDto> GetAll()
        {
            var categories= _context.Categories.ToList();
            List<CategorieDto> categorieDtos = new List<CategorieDto>();
            foreach (var categorie in categories)
            {
                categorieDtos.Add(new CategorieDto
                {
                    Id = categorie.Id,
                    Nom = categorie.Nom,
                    Description = categorie.Description
                });
            }
            return categorieDtos;

        }

        [HttpGet("{id}")]
        public CategorieDto Form( int id)
        {
            if(_context.Categories.Find(id) == null)
            {
                return new CategorieDto();
            }
            else {
                var categorie = _context.Categories.Find(id);
                return new CategorieDto
                {
                    Id = categorie!.Id,
                    Nom = categorie.Nom,
                    Description = categorie.Description
                };
            }
        }
        
        [HttpPost]
        public IActionResult Form([FromBody] CategorieDto categorie)
        {
            if(_context.Categories.Find(categorie.Id) != null)
            {   
                if(_context.Categories.Any(x => x.Nom == categorie.Nom && x.Description == categorie.Description))
                {   return BadRequest();    }
                Categorie obj = _context.Categories.Find(categorie.Id)!;
                obj.Nom=categorie.Nom;
                obj.Description=categorie.Description;
                _context.Categories.Update(obj);
                _context.SaveChanges();
                return Ok();
            }
            else
            {
            if(_context.Categories.Any(x => x.Nom == categorie.Nom))
            {   return BadRequest();    }
                var obj = new Categorie
                {
                    Id = categorie.Id,
                    Nom = categorie.Nom,
                    Description = categorie.Description
                };
                _context.Categories.Add(obj);
                _context.SaveChanges();
                return Ok();
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete( int id )
        {
            if(_context.Categories.Find(id) == null)
            {
                return NotFound();
            }
            _context.Categories.Remove(_context.Categories.Find(id)!);
            _context.SaveChanges();
            return Ok();
        }
  
    }
}