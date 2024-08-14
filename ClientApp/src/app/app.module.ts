import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule  } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { LoginComponent } from './components/login/login.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { CategorieFormComponent } from './components/categorie-form/categorie-form.component';
import { UtilisateurComponent } from './components/utilisateur/utilisateur.component';
import { UtilisateurFormComponent } from './components/utilisateur-form/utilisateur-form.component';
import { ModeleComponent } from './components/modele/modele.component';
import { ModeleFormComponent } from './components/modele-form/modele-form.component';
import { VariableComponent } from './components/variable/variable.component';
import { VariableFormComponent } from './components/variable-form/variable-form.component';
import { GenerationComponent } from './components/generation/generation.component';
import { PersonnalisationComponent } from './components/personnalisation/personnalisation.component';
import { PrevisualisationComponent } from './components/previsualisation/previsualisation.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { AuthGuard } from './helpers/auth.guard';
import { ModeleFormVarComponent } from './components/modele-form-var/modele-form-var.component';

const routes: Routes = [
  { path: '', redirectTo: 'Auth/Login', pathMatch: 'full' },
  { path: 'Auth/Logout', redirectTo: 'Auth/Login', pathMatch: 'full' },
  { path: 'Auth/Login', component: LoginComponent},
  
  // Routes accessible by Administrateur only
  { path: 'Categorie', component: CategorieComponent, canActivate: [AuthGuard], data: { expectedType: 'Administrateur' } },
  { path: 'Categorie/Delete/:id', component: CategorieComponent, canActivate: [AuthGuard], data: { expectedType: 'Administrateur' } },
  { path: 'Categorie/Form', component: CategorieFormComponent, canActivate: [AuthGuard], data: { expectedType: 'Administrateur' } },
  { path: 'Categorie/Form/:id', component: CategorieFormComponent, canActivate: [AuthGuard], data: { expectedType: 'Administrateur' } },

  { path: 'Utilisateur', component: UtilisateurComponent, canActivate: [AuthGuard], data: { expectedType: 'Administrateur' } },
  { path: 'Utilisateur/Delete/:id', component: UtilisateurComponent, canActivate: [AuthGuard], data: { expectedType: 'Administrateur' } },
  { path: 'Utilisateur/Form', component: UtilisateurFormComponent, canActivate: [AuthGuard], data: { expectedType: 'Administrateur' } },
  { path: 'Utilisateur/Form/:id', component: UtilisateurFormComponent, canActivate: [AuthGuard], data: { expectedType: 'Administrateur' } },

  // Routes accessible by Speciale and Administrateur
  { path: 'Modele', component: ModeleComponent, canActivate: [AuthGuard], data: { expectedType: ['Speciale', 'Administrateur'] } },
  { path: 'Modele/Delete/:id', component: ModeleComponent, canActivate: [AuthGuard], data: { expectedType: ['Speciale', 'Administrateur'] } },
  { path: 'Modele/FormVar', component: ModeleFormVarComponent, canActivate: [AuthGuard], data: { expectedType: ['Speciale', 'Administrateur'] } },
  { path: 'Modele/Form', component: ModeleFormComponent, canActivate: [AuthGuard], data: { expectedType: ['Speciale', 'Administrateur'] } },
  { path: 'Modele/Form/:id', component: ModeleFormComponent, canActivate: [AuthGuard], data: { expectedType: ['Speciale', 'Administrateur'] } },

  { path: 'Variable', component: VariableComponent, canActivate: [AuthGuard], data: { expectedType: ['Speciale', 'Administrateur'] } },
  { path: 'Variable/Delete/:id', component: VariableComponent, canActivate: [AuthGuard], data: { expectedType: ['Speciale', 'Administrateur'] } },
  { path: 'Variable/Form', component: VariableFormComponent, canActivate: [AuthGuard], data: { expectedType: ['Speciale', 'Administrateur'] } },
  { path: 'Variable/Form/:id', component: VariableFormComponent, canActivate: [AuthGuard], data: { expectedType: ['Speciale', 'Administrateur'] } },

  // Routes accessible by Speciale and Normale
  { path: 'Generation', component: GenerationComponent, canActivate: [AuthGuard], data: { expectedType: ['Speciale', 'Normale'] } },
  { path: 'Generation/Personnalisation', component: PersonnalisationComponent, canActivate: [AuthGuard], data: { expectedType: ['Speciale', 'Normale'] } },
  { path: 'Generation/Personnalisation/Previsualisation', component: PrevisualisationComponent, canActivate: [AuthGuard], data: { expectedType: ['Speciale', 'Normale'] } },
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    CategorieComponent,
    CategorieFormComponent,
    UtilisateurComponent,
    UtilisateurFormComponent,
    ModeleComponent,
    ModeleFormComponent,
    ModeleFormVarComponent,
    VariableComponent,
    VariableFormComponent,
    GenerationComponent,
    PersonnalisationComponent,
    PrevisualisationComponent
  ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule ,
    FormsModule,
    RouterModule.forRoot(routes)
    
  ],
   providers: [
    AuthGuard,
    {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  }
   ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
