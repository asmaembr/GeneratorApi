import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/interfaces/Categorie';
import { LoggedIn } from 'src/app/interfaces/LoggedIn';
import { NatureVarOptions, TypeVarOptions, Variable } from 'src/app/interfaces/Variable';
import { AuthService } from 'src/app/services/auth.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.css']
})
export class VariableComponent implements OnInit {
  user : LoggedIn | null = this.authService.getUser();
  variables: Variable[] = [];
  types = TypeVarOptions;
  natures = NatureVarOptions;
  searchQuery: string = '';
  color = '';

  constructor(
    private authService: AuthService,
    private variableService: VariableService,
    private router: Router,
  ) {}  

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.variableService.getVariables(this.user!).subscribe((data: Variable[]) => {
      this.variables = data;
    });
    
  }

  get filteredItems() {
    return this.variables.filter(variable =>
      variable.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  deleteVariable(id: number): void {
    this.variableService.deleteVariable(id).subscribe(() => {
      this.variables = this.variables.filter(variable => variable.id !== id);
      this.router.navigate(['/Variable']);
    });
  }
}
