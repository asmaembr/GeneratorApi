import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../interfaces/Categorie';
import { CategorieService } from '../../services/categorie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent  implements OnInit {
  categories: Categorie[] = [];
  searchQuery: string = '';

  constructor(private categorieService: CategorieService,
    private router: Router
  ) { }

  ngOnInit(): void {    
    this.categorieService.getCategories().subscribe(
    (data: Categorie[]) => {
      this.categories = data;
    }
  );
  }

  getKeys(obj: any): string[] {
    if (obj == null) {
      return []; 
    }
  
    let keys = Object.keys(obj);
    keys = keys.filter(key => key !== 'id');
    keys = keys.filter(key => key !== 'token');
    keys.push('actions');
    return keys;
  }
  
  get filteredItems() {
    return this.categories.filter(category => 
      category.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  deleteCategorie(id: number): void {
    this.categorieService.deleteCategorie(id).subscribe(() => {
      this.categories = this.categories.filter(category => category.id !== id);
      this.router.navigate(['/Categorie']);
    });
  }
}
