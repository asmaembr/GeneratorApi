import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LoginComponent } from './components/login/login.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  showMenu: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const route = this.activatedRoute.root;
      const isLoginPath = this.router.url.includes('/Auth/Login');
      const isLoginComponentActive = this.isLoginComponent(route);
      this.showMenu = !isLoginPath && !isLoginComponentActive;
    });
  }

  private isLoginComponent(route: ActivatedRoute): boolean {
    if (route.snapshot.component) {
      return route.snapshot.component === LoginComponent; 
    }
    for (const child of route.children) {
      if (this.isLoginComponent(child)) {
        return true;
      }
    }
    return false;
  }
}
