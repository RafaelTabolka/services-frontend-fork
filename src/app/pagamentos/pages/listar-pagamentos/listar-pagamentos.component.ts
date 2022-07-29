import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormPagamentosComponent } from '../../components/form-pagamentos/form-pagamentos.component';
import { Pagamento } from '../../models/pagamento';
import { PagamentoService } from '../../services/pagamento.service';

@Component({
  selector: 'app-listar-pagamentos',
  templateUrl: './listar-pagamentos.component.html',
  styleUrls: ['./listar-pagamentos.component.css']
})
export class ListarPagamentosComponent implements OnInit {

  pagamentos: Pagamento[] = []
  colunas: Array<string> = [
    'id',
    'valor',
    'forma de pagamento',
    'status do pagamento'
  ]

  constructor(
    private dialog: MatDialog,
    private pagService: PagamentoService
  ) { }

  ngOnInit(): void {
    this.pagService.atualizarPagamento$
    .subscribe(
      (atualizar) => {
        if (atualizar) {
          this.recuperarPagamentos()
        }
      }
    )
  }

  recuperarPagamentos(): void {
    this.pagService.getPagamentos().subscribe(
      (pag) => { // sucesso
        this.pagamentos = pag.reverse()
      },
      (erro) => { // erro
        console.log(erro)
      },
      () => { // complete
        console.log('Dados enviados com sucesso')
      }
    )
  }

  abrirFormPagamento(): void {
    const referenciaDialog = this.dialog.open(FormPagamentosComponent)

    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarPagamentos()
      }
    )
  }

}
