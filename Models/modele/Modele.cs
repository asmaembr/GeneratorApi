using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;
using quickemail_backend.Models.utilisateur;

namespace quickemail_backend.Models
{
    public class Modele
    {
        [Key]
        public int Id {get;set;}
        [Required]
        public string Nom {get;set;}
        [Required]
        public bool Publier {get;set;}
        [Required]
        public Categorie Categorie{get;set;}

        [Required]
        public string Contenu {get;set;}
        [Required]
        public string userId  {get;set;}

        public List<Variable> Variables{get;set;} = new List<Variable>();
    }
}