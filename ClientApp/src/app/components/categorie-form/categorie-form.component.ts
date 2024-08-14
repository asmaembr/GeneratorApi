import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CategorieService } from 'src/app/services/categorie.service';
import { Categorie } from 'src/app/interfaces/Categorie';

@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.css']
})
export class CategorieFormComponent implements OnInit {
  categorie: Categorie = { id: 0, nom: '', description: '' };
  errorMessage: string | null = null; 

  constructor(
    private categorieService: CategorieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.categorieService.getCategorie(id).subscribe((data: Categorie) => {
        this.categorie = data;
      });
    }
  }

  onSubmit(form: NgForm): void {
    const handleError = (error: any) => {
      this.errorMessage = "veillez changer le nom ou la description de la categorie ";
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000); 
    };

    if (this.categorie.id) {
      this.categorieService.saveCategorie(this.categorie).subscribe({
        next: () => {
          this.router.navigate(['/Categorie']);
        },
        error: handleError
      });
    } else {
      this.categorieService.saveCategorie(this.categorie).subscribe({
        next: () => {
          this.router.navigate(['/Categorie']);
        },
        error: handleError
      });
    }
  }
}
