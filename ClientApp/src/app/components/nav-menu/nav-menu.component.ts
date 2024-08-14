import { Component, OnInit } from '@angular/core';
import { TypeOptions, Utilisateur } from 'src/app/interfaces/Utilisateur';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoggedIn } from 'src/app/interfaces/LoggedIn';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isExpanded = false;
  
  selectedItem: any = null;
  showUserInfo: boolean = true;
  typeoptions = TypeOptions;

  loggedInUser: LoggedIn | null = null;

  navItems  = [{ label : ' ' , link : ' '} ];
  admin = [
    { label: 'Utilisateurs', link : '/Utilisateur'},
    { label: 'Categories', link : '/Categorie' },
    { label: 'Variables',  link : '/Variable' },
    { label: 'Modèles',  link : '/Modele' },
    {label : 'Se Déconnecter',  link : '/Auth/Login'  }
  ];

  speciale = [
    { label: 'Variables',  link : '/Variable' },
    { label: 'Modèles',  link : '/Modele' },
    { label:'Géneration' , link: '/Generation'},
    { label : 'Se Déconnecter',  link : '/Auth/Login'  }
  ];
  normale = [
    { label:'Géneration' , link: '/Generation'},
    { label : 'Se Déconnecter',  link : '/Auth/Login'  }
  ];

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {
      this.loggedInUser = this.service.getUser();
      if(this.loggedInUser?.type == 0 )
        this.navItems = this.admin ;
      else if(this.loggedInUser?.type == 1)
        this.navItems = this.speciale;
      else if(this.loggedInUser?.type == 2)
        this.navItems = this.normale;
  }


  selectItem(item: any) {
    this.selectedItem = item;
    if(item.label === 'Se Déconnecter') {
      this.service.logout().subscribe(() => {
        this.router.navigate(['/Auth/Login']);
      });
    }
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
