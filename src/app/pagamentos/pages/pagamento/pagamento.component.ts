import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Pagamento } from '../../models/pagamento'
import { PagamentoService } from '../../services/pagamento.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  formPagamentos: FormGroup = this.fb.group({
    idPagamento: ['', [ Validators.required ]],
    valor: ['', [ Validators.required ]],
    formPagamento: ['', [ Validators.required ]],
    status: ['', [ Validators.required ]]
  })

  pagamento!: Pagamento
  desabilitar: boolean = true
  naoEncontrado: boolean = false

  constructor(
    public authService: AuthService,
    private pagService: PagamentoService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private title:Title
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        let idPagamento = parseInt(params.get('idPagamento') ?? '0')
        this.recuperarPagamento(idPagamento)

        this.pagService.getPagamentosById(idPagamento).subscribe(() => {
          this.title.setTitle("Pagamento " + this.formPagamentos.value.idPagamento)
        })
      }
    )
  }

  valorMudou() {
    this.formPagamentos.valueChanges
    .subscribe(
      (valores) => {
        this.desabilitar = this.formPagamentos.invalid || !(valores.valor != this.pagamento.valor 
          || valores.formPagamento != this.pagamento.formPagamento || valores.status.StatusPagamento != this.pagamento.status)
      }
    )
  }

  recuperarPagamento(id: number): void {
    this.pagService.getPagamentosById(id)
    .subscribe(
      pag => {
        this.pagamento = pag
        this.formPagamentos.setValue({
          idPagamento: this.pagamento.idPagamento,
          valor: this.pagamento.valor,
          formPagamento: this.pagamento.formPagamento,
          status: this.pagamento.status
        })
        this.valorMudou()
      },
      (erro: HttpErrorResponse) => {
        this.naoEncontrado = erro.status == 404
      }
    )
  }

  salvarAtualizacoes() {
    const p: Pagamento = { ...this.formPagamentos.value }
    p.idPagamento = this.pagamento.idPagamento

    const obsSalvar: Observable<any> = this.pagService.atualizarPagamentos(p)

    obsSalvar
    .subscribe(
      (resultado) => {
        if (resultado instanceof Observable<Pagamento>) {
          resultado
          .subscribe(
            (pag) => {
              this.snackBar.open('Pagamento salvo com sucesso', 'Ok', {
                duration: 3000
              })

              this.recuperarPagamento(pag.idPagamento)
            }
          )
        }
        else {
        this.snackBar.open('Pagamento salvo com sucesso', 'Ok', {
          duration: 3000
        })

        this.recuperarPagamento(resultado.idPagamento)
        }
      }
    )
  }
}
