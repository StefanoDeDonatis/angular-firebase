import { Component, OnInit } from '@angular/core';
import { Prodotto } from 'src/app/model/prodotti';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  listaProdotti: Prodotto[] = []
  id: string = '';
  nome: string = '';
  descrizione: string = '';
  prezzo: string = '';

  constructor(private data: DataService,private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getAllProdotti();
  }

  getAllProdotti() {
    this.data.allProdotti().subscribe({
      next: (value) => {
        this.listaProdotti = value.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;

        })
      },
      error: (err) => {
        console.error(err)
      },
    })
  }

  elimina(prodotto: Prodotto) {
    this.data.deleteProdotto(prodotto)
  }

  onClickModifica(prodottoMod : Prodotto){
    this.sharedService.prodottoEdit.next(prodottoMod);
  }
  
}

