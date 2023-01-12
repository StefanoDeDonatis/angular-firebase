import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Prodotto } from '../model/prodotti';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }


  //aggiungi prodotto
  addProdotto(prodotto : Prodotto){
    prodotto.id = this.afs.createId()
    return this.afs.collection('/Prodotti').add(prodotto);
  }


  //lista di prodotti
  allProdotti(){
    return this.afs.collection('/Prodotti').snapshotChanges();
  }

  //delete prodotto
  deleteProdotto(prodotto : Prodotto){
    return this.afs.doc('/Prodotti/'+prodotto.id).delete();
  }

  //update prodotto 
  updateProdotto(prodotto : Prodotto) {
    return this.afs.doc(`/Prodotti/${prodotto.id}`).update({id : prodotto.id, nome : prodotto.nome, descrizione : prodotto.descrizione, prezzo : prodotto.prezzo});
  }
}
