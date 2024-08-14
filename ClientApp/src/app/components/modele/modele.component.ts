import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/interfaces/Categorie';
import { LoggedIn } from 'src/app/interfaces/LoggedIn';
import { Modele, TypeModeleOptions } from 'src/app/interfaces/Modele';
import { AuthService } from 'src/app/services/auth.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { ModeleDataService } from 'src/app/services/modele-data.service';
import { ModeleService } from 'src/app/services/modele.service';

@Component({
  selector: 'app-modele',
  templateUrl: './modele.component.html',
  styleUrls: ['./modele.component.css']
})
export class ModeleComponent implements OnInit {
  user : LoggedIn | null = this.authService.getUser();
  modeles: Modele[] = [];
  catgories: Categorie[] = [];
  types = TypeModeleOptions;
  searchQuery: string = '';
  color = '';

  constructor(
    private authService: AuthService,
    private modeleService: ModeleService,
    private modeledataService: ModeleDataService,
    private categorieService: CategorieService,
    private router: Router,
  ) {}  

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.modeledataService.clearModele();
    this.categorieService.getCategories().subscribe((data: Categorie[]) => {
      this.catgories = data;
    });

    this.modeleService.getModeles(this.user!).subscribe((data: Modele[]) => {
      this.modeles = data;
    });

  }

  get filteredItems() {
    return this.modeles.filter(variable =>
      variable.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  get filteredCourriel() {
    return this.filteredItems.filter(m =>
      m.type == 1
    );
  }
  get filteredLettre() {
    return this.filteredItems.filter(m =>
      m.type == 0
    );
  }
  getCategorie(id : number): string {
    var str : string = '';
    this.catgories.forEach(element => {
      if (element.id == id) {
        str = element.nom;}
      });
        
    return str;
  }

  deleteModele(id: number): void {
    this.modeleService.deleteModele(id).subscribe({
      next: () => {
        this.modeles = this.modeles.filter(modele => modele.id !== id);
      }
  });
}
}
