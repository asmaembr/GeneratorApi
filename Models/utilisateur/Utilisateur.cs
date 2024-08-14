using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace quickemail_backend.Models.utilisateur
{
    public class Utilisateur : IdentityUser
    {
        [Required]
        public string Nom{ get; set; } 
    
        public  List<Categorie> Categories{ get; set; } = new List<Categorie>();
 
    }
}