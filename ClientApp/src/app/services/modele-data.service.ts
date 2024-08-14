import { Injectable } from '@angular/core';
import { Modele } from '../interfaces/Modele';

@Injectable({
  providedIn: 'root'
})
export class ModeleDataService{
  private modele: Modele | null = null;

  setModele(modele: Modele) {
    this.modele = modele;
    localStorage.setItem('modele', JSON.stringify(modele));
  }

  getModele(): Modele | null {
    this.modele = localStorage.getItem('modele') ? JSON.parse(localStorage.getItem('modele')!) : null;
    return this.modele;
  }

  clearModele() {
    localStorage.removeItem('modele');
    this.modele = null;
  }
}
