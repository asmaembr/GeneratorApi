import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedIn } from 'src/app/interfaces/LoggedIn';
import { LoginModel } from 'src/app/interfaces/LoginModel';
import { TypeOptions } from 'src/app/interfaces/Utilisateur';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  model: LoginModel = { username: '', password: '' };
  loggedInUser : any ; 
  typeOptions = TypeOptions;
  errorMessage: string | null = null;
  type: string = 'password';
  eyeIcon: string = 'fa-eye';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {  
    this.loggedInUser = this.authService.getUser();
  }

  onSubmit(form: any) {

  if (form.valid) {
    
  const handleError = (error: any) => {
    this.errorMessage = "username ou mot de passe incorrecte";
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000); 
  };
      this.authService.login(this.model).subscribe({
        next: (data: LoggedIn) => {
          this.authService.setUser(data);
          this.loggedInUser = this.authService.getUser();
          if(data.type== 0)
          { this.router.navigate(['/Utilisateur']) }
          else if(data.type== 1)
          {this.router.navigate(['/Modele'])}
          else if(data.type== 2)
          {this.router.navigate(['/Generation'])}
        },
        error: handleError 
        
      });
    }   
  }




  hideShowPass() {
    if (this.type === 'password') {
      this.type = 'text';
      this.eyeIcon = 'fa-eye-slash';
    } else {
      this.type = 'password';
      this.eyeIcon = 'fa-eye';
    }
  }
}
