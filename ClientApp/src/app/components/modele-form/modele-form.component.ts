import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/interfaces/Categorie';
import { LoggedIn } from 'src/app/interfaces/LoggedIn';
import { Modele, TypeModeleOptions } from 'src/app/interfaces/Modele';
import { AuthService } from 'src/app/services/auth.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { ModeleDataService } from 'src/app/services/modele-data.service';
import { ModeleService } from 'src/app/services/modele.service';

@Component({
  selector: 'app-modele-form',
  templateUrl: './modele-form.component.html',
  styleUrls: ['./modele-form.component.css']
})
export class ModeleFormComponent  implements OnInit {

  user : LoggedIn | null = this.authService.getUser();
  types = TypeModeleOptions;
  modele : Modele = {
    id: 0,
    nom: '',
    type: 0,
    publier: false,
    categorieId: 0,
    contenu: '',
    username: this.user!.username,
    variables: [],
  };
  errorMessage: string | null = null; 
  categories: Categorie[] = [];

  constructor(
    private authService : AuthService,
    private modeleService: ModeleService,
    private modeleDataService : ModeleDataService,
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

ngOnInit(): void {

  for (let i = 0; i < this.user!.categories.length; i++) {
    this.categorieService.getCategorie(this.user!.categories[i]).subscribe({
      next: (data: Categorie) => {
        this.categories.push(data);
      },
      error: () => this.errorMessage = "Categorie introuvable."
    });
  }
  
  const id = this.route.snapshot.params['id'];
  if (id) {
    this.modeleService.getModele(id).subscribe({
      next: (data: Modele) => {
        this.modele = data;
        this.modeleDataService.setModele(this.modele);
      }
    });
  }
}

onTypeChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  if (target) {
    const selectedIndex = target.selectedIndex; 
    this.modele.type = selectedIndex;
  }
}



  onSubmit(form: NgForm):void {
    this.modele.username = this.user!.username;
    this.modeleDataService.setModele(this.modele);
    this.router.navigate(['Modele/FormVar']);
  }


}

