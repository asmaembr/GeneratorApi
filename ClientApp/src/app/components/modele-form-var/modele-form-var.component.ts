import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedIn } from 'src/app/interfaces/LoggedIn';
import { Modele, TypeModeleOptions } from 'src/app/interfaces/Modele';
import { NatureVarOptions, TypeVarOptions, Variable } from 'src/app/interfaces/Variable';
import { AuthService } from 'src/app/services/auth.service';
import { ModeleDataService } from 'src/app/services/modele-data.service';
import { ModeleService } from 'src/app/services/modele.service';
import { VariableService } from 'src/app/services/variable.service';
@Component({
  selector: 'app-modele-form-var',
  templateUrl: './modele-form-var.component.html',
  styleUrls: ['./modele-form-var.component.css']
})
export class ModeleFormVarComponent implements OnInit {


  searchQuery: string = '';
  modele : Modele = this.modeleDataService.getModele()!; 
  user : LoggedIn | null = this.authService.getUser();
  variables : Variable[] = [];
  types = TypeVarOptions;
  natures = NatureVarOptions;
  selectedVariables: any[] = [];

  constructor(
    private authService : AuthService,
    private modeleDataService : ModeleDataService,
    private modeleService : ModeleService,
    private variableService : VariableService,
    private router : Router
  ) { }

  ngOnInit(): void { 
    this.user = this.authService.getUser()! ;
    this.modele = this.modeleDataService.getModele()!;
    this.variableService.getVariables(this.user).subscribe((data: Variable[]) => {
      this.variables = data;
      this.variables = this.variables.filter(variable => variable.publier === true);
    this.modele.contenu = this.replaceIdWithVariableName(this.modele.contenu, this.variables);
    this.modeleDataService.setModele(this.modele);
    });


  }
  
  get filteredItems() {
    return this.variables.filter(variable =>
      variable.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onPublierChange(event: any): void {
    this.modele.publier = event.target.checked;
    this.modeleDataService.setModele(this.modele);
  }

addVariable(variable: Variable) {
    const textarea = document.getElementById('contenu') as HTMLTextAreaElement;
    if (textarea) {
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const textBeforeCursor = textarea.value.substring(0, startPos);
        const textAfterCursor = textarea.value.substring(endPos, textarea.value.length);

        const variableName = `[${variable.nom}]`;
        textarea.value = textBeforeCursor + variableName + textAfterCursor;

        this.modele.contenu = textarea.value;

        textarea.selectionStart = textarea.selectionEnd = startPos + variableName.length;
        textarea.focus();
    }
}



  onContentChange(event: any): void {
    this.modele.contenu = event.target.value;
    this.modeleDataService.setModele(this.modele);
  }


private extractVariableName(content: string): string[] {
  const variableNames: string[] = [];
  const regex = /\[(.*?)\]/g;
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    variableNames.push(match[1]);
  }

  return variableNames;
}

private replaceIdWithVariableName(content: string, variables: Variable[]): string {
  const variableMap = variables.reduce((map, variable) => {
    map[variable.id.toString()] = variable.nom;
    return map;
  }, {} as { [id: string]: string });

  const regex = /\[(\d+)\]/g;
  return content.replace(regex, (_, id) => {
    const variableName = variableMap[id];
    return `[${variableName || id}]`;
  });
}


private replaceVariableNameWithId(content: string, variables: Variable[]): string {
  const variableMap = variables.reduce((map, variable) => {
    map[variable.nom] = variable.id;
    return map;
  }, {} as { [name: string]: number });

  const regex = /\[(.*?)\]/g;

  return content.replace(regex, (_, name) => {
    return `[${variableMap[name] || name}]`;
  });
}




  onSubmit(form: NgForm): void {

    const names = this.extractVariableName(this.modele.contenu);
    this.modele.variables = [];
    names.forEach(nom => {
    const variable = this.variables.find(v => v.nom === nom);
    if (variable && !this.modele.variables.includes(variable.id)) {
      this.modele.variables.push(variable.id);
    }
    });

    this.modele.contenu = this.replaceVariableNameWithId(this.modele.contenu, this.variables);
    this.modeleDataService.setModele(this.modele);

    if (this.modele.id) {
      this.modeleService.saveModele(this.modele).subscribe({
        next: () => {
          this.router.navigate(['/Modele']);
        }
      });
    } else {
      this.modeleService.saveModele(this.modele).subscribe({
        next: () => {
          this.router.navigate(['/Modele']);
        }
      });
    }
  }

}
