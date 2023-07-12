import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';

import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
})
export class PainelComponent implements OnInit, OnDestroy {
  public frases: Frase[] = FRASES;
  public instrucao: string = 'Traduza a frase :';
  public resposta: string = '';

  public rodada: number = 0;
  public rodadaFrase: Frase = {} as Frase;

  public progresso: number = 0;

  public tentativas: number = 5;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    // console.log('Componente Painel foi destruido');
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
    // console.log(this.resposta);
  }

  public verificarResposta(): void {
    // console.log('Verificar resposta: ', this.resposta);

    if (this.rodadaFrase.frasePtBr === this.resposta) {
      // alert('Parabéns, você acertou!');

      this.rodada++;

      this.progresso = this.progresso + 100 / this.frases.length;
      // console.log('Rodada: ', this.progresso);

      if (this.rodada === 100) {
        this.encerrarJogo.emit('vitoria');
        alert('Parabéns, você terminou o jogo!');
      }

      // console.log(this.rodada);
      this.atualizaRodada();

      this.resposta = '';
    } else {
      // alert(
      //   'A tradução está errada, tente novamente. A resposta correta está no console, Digite (CTRL + Shift + i ) para ver a resposta.'
      // );
      console.log('A resposta correta é: ', this.rodadaFrase.frasePtBr);
      this.tentativas--;
      // console.log('tentativas restantes: ', this.tentativas)

      if (this.tentativas === 0) {
        this.encerrarJogo.emit('derrota');
        console.log('Você perdeu o jogo!');
      }
    }
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';
    // console.log('Frase atual: ', this.rodadaFrase);
  }
}
