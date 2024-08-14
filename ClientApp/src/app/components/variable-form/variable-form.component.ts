import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/interfaces/Categorie';
import { LoggedIn } from 'src/app/interfaces/LoggedIn';
import { Utilisateur } from 'src/app/interfaces/Utilisateur';
import { NatureVarOptions, TypeVarOptions, Variable } from 'src/app/interfaces/Variable';
import { AuthService } from 'src/app/services/auth.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-variable-form',
  templateUrl: './variable-form.component.html',
  styleUrls: ['./variable-form.component.css']
})
export class VariableFormComponent implements OnInit {
  user : LoggedIn | null = this.authService.getUser();
  natures = NatureVarOptions;
  types = TypeVarOptions;
  variable : Variable = {
    id: 0, nom: '', 
    type: this.types.indexOf('Simple'), 
    nature: this.natures.indexOf('TEXTE'),
    formule: '', 
    username: this.user!.username,
    categories: [],
    publier: false
  };
  errorMessage: string | null = null; 
  categories: Categorie[] = [];

  constructor(
    private authService : AuthService,
    private variableService: VariableService,
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
    this.variableService.getVariable(id).subscribe({
      next: (data: Variable) => {
        this.variable = data;
        this.updateCheckboxStates();
      }
    });
  }
}

updateCheckboxStates(): void {
    this.variable.categories.forEach(categoryId => {
      const checkbox = document.getElementById(categoryId.toString()) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = true;
      }
    });
}
onCheckboxChange(event: any, categoryId: number): void {
  if (event.target.checked) {
    this.variable.categories.push(categoryId);
  } else {
    this.variable.categories = this.variable.categories.filter(id => id !== categoryId);
  }
}

onPublierChange(event: any): void {
  this.variable.publier = event.target.checked;
}

onTypeChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  if (target) {
    const selectedIndex = target.selectedIndex; 
    this.variable.type = selectedIndex;
  }
}

onNatureChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  if (target) {
    const selectedIndex = target.selectedIndex; 
    this.variable.nature = selectedIndex;
  }
}


onSubmit(form: NgForm):void {
  const handleError = (error: any) => {
    this.errorMessage = "Veillez changer le nom de la variable.";
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000); 
  };
  this.variable.username = this.user!.username;
  if (this.variable.id) {
    this.variableService.saveVariable(this.variable).subscribe({
      next: () => {
        this.router.navigate(['/Variable']);
      },
      error: handleError
    });
  } else {
    this.variableService.saveVariable(this.variable).subscribe({
      next: () => {
        this.router.navigate(['/Variable']);
      },
      error: handleError
    });
  }

}



}
