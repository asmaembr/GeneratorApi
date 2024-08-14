using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using generator_API.Models.variable;
using quickemail_backend.Models;

namespace generator_API.DTOs
{
    public class VariableDto
    {
        public int Id { get; set; }
        [Required]
        public string Nom { get; set; } 
        public string Formule { get; set; } 
        [Required]
        public bool Publier { get; set; }
        [Required]
        public TypeVariable Type { get; set; }

        [Required]
        public NatureVariable Nature { get; set; }
        [Required]
        public string Username { get; set; } 

        [Required]
        public List<int> Categories { get; set; } = new List<int>();
    }
}