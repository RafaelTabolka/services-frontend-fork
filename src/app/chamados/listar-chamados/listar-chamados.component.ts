import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogExcluirChamadosComponent } from '../components/dialog-excluir-chamado/dialog-excluir-chamado.component';
import { FormChamadoComponent } from '../components/form-chamado/form-chamado.component';
import { Chamados } from '../interface/chamado';
import { ChamadosServiceService } from '../service/chamados-service.service';

@Component({
  selector: 'app-listar-chamados',
  templateUrl: './listar-chamados.component.html',
  styleUrls: ['./listar-chamados.component.css']
})
export class ListarChamadosComponent implements OnInit {

 
  chamado: Chamados[] = []
  colunas: Array<string> = ['idChamado','titulo','descricao','dataEntrada','status','funcionario','cliente','pagamento', 'excluir' ]

    constructor(
    private dialog: MatDialog, 
    private snackbar: MatSnackBar,
    private chamService: ChamadosServiceService
  ) { }

  ngOnInit(): void {
    

    this.chamService.update$
    .subscribe(
      (atualizar) => {
        if (atualizar) {
          this.recuperarChamado()
        }
      }
    )
  }

  deletarChamado( id: number): void {
   
    const dialogRef = this.dialog.open(DialogExcluirChamadosComponent)

   
    dialogRef.afterClosed()
    .subscribe(
      (deletar) => {
        
        if (deletar == true) {
          this.chamService.deleteChamadosById(id)
          .subscribe(
            () => {
              this.snackbar.open('Chamado deletado', 'Ok', {
                duration: 3000
              })
              this.recuperarChamado()
            },
            (error) => {
              this.snackbar.open('Não foi possível deletar o chamado', 'Ok', {
                duration: 3000
              })
              console.log(error)
            }
          )
        }
      }
    )
  }

  recuperarChamado(): void {
    this.chamService.getChamados().subscribe(
      (cham) => { 
        this.chamado = cham.reverse()
        
      },
      (erro) => {
        console.log(erro)
      },
      () => {
        console.log('Dados enviados com sucesso')
      }
    )
  }

  abrirFormChamados(): void {
    const ref = this.dialog.open(FormChamadoComponent)
    ref.afterClosed().subscribe(
      () => {
        this.recuperarChamado()
      }
    )
  }
}
