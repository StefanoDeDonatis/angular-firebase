import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Prodotto } from 'src/app/model/prodotti';
import { DataService } from 'src/app/services/data.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private data: DataService, private sharedService: SharedService) {

    this.prodottoForm! = this.formBuilder!.group({
      nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
      descrizione: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(75)]),
      prezzo: new FormControl("", [Validators.required, Validators.min(0.01)]),
    });
  }

  mockProdotto: Prodotto = {
    nome: '',
    descrizione: '',
    prezzo: ''
  };
  id : string = ''

  flagProdottoModificato : boolean = false;

  prodottoForm: FormGroup;

  ngOnInit(): void {
    this.sharedService.prodottoEdit.subscribe((prodotto) => {
      if(prodotto.nome !== ''){
        this.prodottoForm.controls['nome'].setValue(prodotto.nome);
        this.prodottoForm.controls['descrizione'].setValue(prodotto.descrizione);
        this.prodottoForm.controls['prezzo'].setValue(prodotto.prezzo);
        this.id = prodotto.id!
        
        this.flagProdottoModificato = true
        console.log(prodotto);
      }
      
    });
  }

  addProdotto() {

    this.mockProdotto!.nome = this.prodottoForm.value.nome;
    this.mockProdotto!.descrizione = this.prodottoForm.value.descrizione;
    this.mockProdotto!.prezzo = this.prodottoForm.value.prezzo;

    this.data.addProdotto(this.mockProdotto!)

    this.reset();
  }

  reset(){
    this.prodottoForm.reset();
    this.flagProdottoModificato = false
  }

  aggiornaProdotto(){

    this.mockProdotto!.nome = this.prodottoForm.value.nome;
    this.mockProdotto!.descrizione = this.prodottoForm.value.descrizione;
    this.mockProdotto!.prezzo = this.prodottoForm.value.prezzo;
    this.mockProdotto!.id = this.id

    this.data.updateProdotto(this.mockProdotto!)
    this.reset()
  }

}
