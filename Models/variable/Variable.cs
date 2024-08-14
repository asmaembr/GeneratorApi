using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using generator_API.Models.variable;
using Microsoft.AspNetCore.Identity;
using quickemail_backend.Models.utilisateur;


namespace quickemail_backend.Models
{
    public class Variable
    {   
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nom { get; set; }
        public string Formule { get; set; } = "";
        [Required]
        public bool Publier { get; set; }
        [Required]
        public TypeVariable Type { get; set; }
        [Required]
        public NatureVariable Nature { get; set; }
        [Required]
        public string userId  {get;set;}
        [Required]
        public List<Categorie> Categories { get; set; } = new List<Categorie>();
        
        public List<Modele> Modeles { get; set; } = new List<Modele>();
    }
}