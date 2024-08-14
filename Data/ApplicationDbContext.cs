using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using quickemail_backend.Models ;
using quickemail_backend.Models.utilisateur;

namespace generator_API.Data
{
    public class ApplicationDbContext : IdentityDbContext<Utilisateur>
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {}
        public DbSet<Utilisateur> Utilisateurs { get; set; }
        public DbSet<Speciale> Speciales { get; set; }
        public DbSet<Normale> Normales { get; set; }
        public DbSet<Administrateur> Administrateurs { get; set; }
        public DbSet<Modele> Modeles { get; set; }
        public DbSet<Courriel> Courriels { get; set; }
        public DbSet<Lettre> Lettres { get; set; }
        public DbSet<Variable> Variables { get; set; }
        public DbSet<Categorie> Categories { get; set; }

    }
    
    
    }