using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using generator_API.Models.utilisateur;

namespace generator_API.DTOs
{
    public class UtilisateurDto
    {   
        
        public string Id { get; set; } = string.Empty;
        [Required]
        public string Username { get; set; }=string.Empty;
        [Required]
        public string Password { get; set; }=string.Empty;
        [Required]
        [EmailAddress]
        public string Email { get; set; }=string.Empty;
        [Required]
        public TypeUser Type { get; set; }
        
        [Required]
        public string Nom { get; set; }=string.Empty;
        
        [Required]
        public List<int> Categories { get; set; } = new List<int>();
            
    }
}