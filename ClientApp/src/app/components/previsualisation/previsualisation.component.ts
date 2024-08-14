import { Component, OnInit } from '@angular/core';
import { Modele } from 'src/app/interfaces/Modele';
import { TypeOptions } from 'src/app/interfaces/Utilisateur';
import { AuthService } from 'src/app/services/auth.service';
import { ModeleDataService } from 'src/app/services/modele-data.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-previsualisation',
  templateUrl: './previsualisation.component.html',
  styleUrls: ['./previsualisation.component.css']
})
export class PrevisualisationComponent implements OnInit {

  modele: Modele = this.service.getModele()!;
  user = this.authservice.getUser();
  isSpecial: boolean = false;

  constructor(
    private authservice: AuthService,
    private service: ModeleDataService
  ) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {
    this.modele = this.service.getModele()!;
    this.user = this.authservice.getUser();
    if (this.user?.type === TypeOptions.indexOf("Speciale")) {
      this.isSpecial = true;
    }
  }

  onContentChange(event: any): void {
    this.modele.contenu = event.target.value;
  }

  onEdit() {
    this.service.setModele(this.modele);
  }

  onSave() {
    const documentDefinition = {
      content: [
        { text: this.modele.nom, style: 'header' },
        { text: this.modele.contenu, style: 'content' }
      ],
      styles: {
        header: {
          fontSize: 25,
          bold: true,
          margin: [20, 20, 20, 20] as [number, number, number, number] 
        },
        content: {
          fontSize: 12
        }
      }
    };
    pdfMake.createPdf(documentDefinition).download(this.modele.nom+'.pdf');
  }

}
