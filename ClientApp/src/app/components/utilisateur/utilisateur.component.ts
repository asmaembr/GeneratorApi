import { Component, OnInit } from '@angular/core';
import { TypeOptions, Utilisateur } from 'src/app/interfaces/Utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/services/categorie.service';
import { Categorie } from 'src/app/interfaces/Categorie';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  typeoptions = TypeOptions;
  categories: Categorie[] = [];
  searchQuery: string = '';
  showcategories: boolean = true;

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.utilisateurService.getUtilisateurs().subscribe((data: Utilisateur[]) => {
      this.utilisateurs = data;
    });
    this.categorieService.getCategories().subscribe((data: Categorie[]) => {
      this.categories = data;
    });
  }

  getKeys(obj: any): string[] {
    if (obj == null) {
      return []; 
    }
    let keys = Object.keys(obj);
    keys = keys.filter(key => key !== 'id');
    keys.push('actions');
    return keys;
  }
  
  get filteredItems() {
    return this.utilisateurs.filter(user =>
      user.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  userCategories(categories: number[]): Categorie[] {
    return this.categories.filter(categorie => categories.includes(categorie.id));
  }

  deleteUtilisateur(id: string): void {
    this.utilisateurService.deleteUtilisateur(id).subscribe(() => {
      this.utilisateurs = this.utilisateurs.filter(user => user.id !== id);
      this.router.navigate(['/Utilisateur']);
    });
  }
}
