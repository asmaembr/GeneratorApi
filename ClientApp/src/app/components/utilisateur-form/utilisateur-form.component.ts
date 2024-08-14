import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from 'src/app/interfaces/Categorie';
import { TypeOptions, Utilisateur } from 'src/app/interfaces/Utilisateur';
import { CategorieService } from 'src/app/services/categorie.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-utilisateur-form',
  templateUrl: './utilisateur-form.component.html',
  styleUrls: ['./utilisateur-form.component.css']
})
export class UtilisateurFormComponent implements OnInit {
  utilisateur: Utilisateur = { id: '', username: '', password: '', email: '', type: 2, nom: '', categories: [] };
  typeOptions = TypeOptions;
  errorMessage: string | null = null; 
  categories: Categorie[] = [];
  type: string = 'password';
  eyeIcon: string = 'fa-eye';
  passwordRequirements = {
    minLength: 8,
    hasUppercase: true,
    hasNumber: true,
    hasSpecialChar: true
  };
  passwordErrors: string[] = [];

  constructor(
    private utilisateurService: UtilisateurService,
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.categorieService.getCategories().subscribe((data: Categorie[]) => {
      this.categories = data;
      this.updateCategoryVisibility();
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.utilisateurService.getUtilisateur(id).subscribe({
        next: (data: Utilisateur) => {
          this.utilisateur = data;
          this.updateCategoryVisibility();
        }
      });
    }
  }

  updateCategoryVisibility(): void {
    if (this.utilisateur?.type === this.typeOptions.indexOf('Administrateur')) {
      this.utilisateur.categories = this.categories.map(categorie => categorie.id);
    }
  }

  onTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
  if (target) {
    const selectedIndex = target.selectedIndex; 
    this.utilisateur.type = selectedIndex;

    if (selectedIndex === this.typeOptions.indexOf('Administrateur')) {
      this.utilisateur.categories = this.categories.map(categorie => categorie.id);
    }
  }
  
  }

  hideShowPass(): void {
    this.type = this.type === 'password' ? 'text' : 'password';
    this.eyeIcon = this.type === 'password' ? 'fa-eye' : 'fa-eye-slash';
  }

  onCheckboxChange(event: any, categoryId: number): void {
    if (event.target.checked) {
      this.utilisateur.categories.push(categoryId);
    } else {
      this.utilisateur.categories = this.utilisateur.categories.filter(id => id !== categoryId);
    }
  }

  validatePassword(password: string): void {
    this.passwordErrors = [];
    if (password.length < this.passwordRequirements.minLength) {
      this.passwordErrors.push(`Password must be at least ${this.passwordRequirements.minLength} characters long.`);
    }
    if (this.passwordRequirements.hasUppercase && !/[A-Z]/.test(password)) {
      this.passwordErrors.push('Password must contain at least one uppercase letter.');
    }
    if (this.passwordRequirements.hasNumber && !/\d/.test(password)) {
      this.passwordErrors.push('Password must contain at least one number.');
    }
    if (this.passwordRequirements.hasSpecialChar && !/[!@#$%^&*()_\-+={}\[\]|\\:;"'<>,.?/~`]/.test(password)) {
      this.passwordErrors.push('Password must contain at least one special character.');
    }
  }

  onSubmit(form: NgForm): void {
    if (this.passwordErrors.length > 0) {
      return;
    }
    const handleError = (error: any) => {
      this.errorMessage = "veillez changer le nom ou l'email de l'utilisateur ";
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000); 
    };

    if (this.utilisateur.id) {
      this.utilisateurService.saveUtilisateur(this.utilisateur).subscribe({
        next: () => {
          this.router.navigate(['/Utilisateur']);
        },
        error: handleError
      });
    } else {
      this.utilisateurService.saveUtilisateur(this.utilisateur).subscribe({
        next: () => {
          this.router.navigate(['/Utilisateur']);
        },
        error: handleError
      });
    }
  }
}
