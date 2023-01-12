import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Prodotto } from '../model/prodotti';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  prodottoEdit: BehaviorSubject<Prodotto> = new BehaviorSubject({nome : '',descrizione : '', prezzo : ''});
}
