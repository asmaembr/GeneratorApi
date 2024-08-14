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
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})
export class GenerationComponent implements OnInit {

  user : LoggedIn | null = this.authService.getUser();
  modeles: Modele[] = [];
  catgories: Categorie[] = [];
  types = TypeModeleOptions;
  searchQuery: string = '';

  constructor(
  private authService: AuthService,
  private modeleService: ModeleService,
  private categorieService: CategorieService,
  private modeledataService: ModeleDataService,
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

Personnalisation(modele : Modele) {
  this.modeledataService.setModele(modele);
  this.router.navigate(['/Generation/Personnalisation']);
}

}
