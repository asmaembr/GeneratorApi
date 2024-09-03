import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedIn } from 'src/app/interfaces/LoggedIn';
import { NatureVarOptions, Variable } from 'src/app/interfaces/Variable';
import { AuthService } from 'src/app/services/auth.service';
import { ModeleDataService } from 'src/app/services/modele-data.service';
import { ModeleService } from 'src/app/services/modele.service';
import { VariableService } from 'src/app/services/variable.service';

@Component({
  selector: 'app-personnalisation',
  templateUrl: './personnalisation.component.html',
  styleUrls: ['./personnalisation.component.css']
})
export class PersonnalisationComponent implements OnInit {
  modele = this.modeledataService.getModele();
  user : LoggedIn = this.authservice.getUser()!;
  natures = NatureVarOptions;
  variables : Variable[] = [];
  variablesform : Variable[] = [];

  
  errorMessage: string | null = null; 

  constructor(
    private   authservice: AuthService,
    private modeledataService: ModeleDataService,
    private variableService: VariableService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.modele = this.modeledataService.getModele();
    this.user = this.authservice.getUser()!;
    this.variableService.getVariables(this.user).subscribe({
      next: (data: Variable[]) => {
        this.variables = data.filter(variable => this.modele?.variables.includes(variable.id));
        console.log(this.variables);
        this.variables.forEach(variable1 =>{ 
          if(variable1 && variable1.formule == ""){
            this.variablesform.push(variable1);
          }
        }
        );
        console.log(this.variablesform);
      },
      error: () => this.errorMessage = "Variables introuvables."
    });
  }
  


private extractVariableIds(content: string): string[] {
    const variableids: string[] = [];
    const regex = /\[(.*?)\]/g;
    let match;
    
    while ((match = regex.exec(content)) !== null) {
      variableids.push(match[1]);
    }
    return variableids;
}

  onSubmit(form: NgForm): void {
    this.replaceVariablesInContent();
    this.modele!.contenu = this.replaceIdWithFormule(this.modele?.contenu!, this.variables);
    this.modeledataService.setModele(this.modele!);
    this.router.navigate(['/Generation/Personnalisation/Previsualisation']);
  }
  

private replaceVariablesInContent(): void {

this.variablesform.forEach((variable) => {
      this.modele!.contenu = this.modele!.contenu?.replace(`[${variable.id}]`, variable.formule);
});

}

private replaceIdWithFormule(content: string, variables: Variable[]): string {
  const variableMap = variables.reduce((map, variable) => {
    map[variable.id.toString()] = variable.formule;
    return map;
  }, {} as { [id: string]: string });

  const regex = /\[(\d+)\]/g;
  return content.replace(regex, (_, id) => {
    const Variableformule = variableMap[id];
    return `${Variableformule || id}`;
  });
}

}
