import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';

import { Coracao } from '../shared/coracao.model';

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css'],
})
export class TentativasComponent implements OnInit, OnChanges {
  // public coracaoVazio = 'assets/coracao_vazio.png';
  // public coracaoMeio = 'assets/coracao_meio.png';
  // public coracaoCheio = 'assets/coracao_cheio.png';

  @Input() public tentativas!: number;

  public coracoes: Coracao[] = [
    new Coracao(true),
    new Coracao(true),
    new Coracao(true),
    new Coracao(true),
    new Coracao(true),
  ];

  constructor() {
    // console.log(this.coracoes);
  }

  ngOnChanges(): void {
    if(this.tentativas !==this.coracoes.length) {
      let indice = this.coracoes.length - this.tentativas;
      this.coracoes[indice - 1].cheio = false;
    }
    console.log('tentativas restantes: ', this.tentativas);
  }

  ngOnInit(): void {}
}
