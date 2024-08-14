using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using quickemail_backend.Models.utilisateur;

namespace quickemail_backend.Models
{
    public class Categorie
    {
        [Key]
        public  int Id { get; set; }
       
        public string Nom { get; set; }
        
        public string Description { get; set; }

        public List<Modele> Modeles { get; set; }
        
        public List<Variable> Variables { get; set; }
        public List<Utilisateur> Utilisateurs { get; set; }

}
}