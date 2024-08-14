using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using generator_API.Models.modele;

namespace generator_API.DTOs
{
    public class ModeleDto
    {
        public int Id {get;set;}
        [Required]
        public string Nom {get;set;}
        [Required]
        public bool Publier {get;set;}
        [Required]
        public int CategorieId {get;set;}
        [Required]
        public TypeModele Type { get; set; }

        [Required]
        public string Contenu { get; set; }

        [Required]
        public string Username { get; set; } 

        
        [Required]
        public List<int> Variables { get; set; } = new List<int>();

    }
}