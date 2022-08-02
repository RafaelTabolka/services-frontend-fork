import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';
import { ChamadosComponent } from '../chamados.component';
import { AtribuirFuncionarioComponent } from '../components/atribuir-funcionario/atribuir-funcionario.component';
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
  colunas: Array<string> = ['idChamado','titulo','descricao','dataEntrada','status','funcionario','atribuirFuncionario','cliente','pagamento', 'editar', 'excluir' ]

  funcionarios!: Funcionario[]

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

  deletarChamado(id: number ): void {


    const dialogRef = this.dialog.open(DialogExcluirChamadosComponent);

    dialogRef.afterClosed().subscribe((deletar) => {

      if (deletar) {
        this.chamService.deleteChamadosById(id).subscribe(
          () => {
             this.chamService.getChamados().subscribe((newValues)=>{
              this.chamado= newValues
             })
            this.snackbar.open('Chamado deletado', 'Ok', {
              duration: 3000,
            });
          },
          (error) => {
            this.snackbar.open('Não foi possível deletar o chamado', 'Ok', {
              duration: 3000,
            });
            console.log(error);
          }
        );
      }
    });
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

  abrirFormCadastrarChamados(): void {

    const ref = this.dialog.open(FormChamadoComponent);
    ref.afterClosed().subscribe(() => {
      this.recuperarChamado()
    });
  }

  abrirEditarChamados(id: number) {
    let chamado = this.chamado.find((c)=> c.idChamado == id) as Chamados
    console.log (chamado)
    let ref = this.dialog.open(ChamadosComponent)
    ref.componentInstance.chamado = chamado

    ref.afterClosed().subscribe((resultado) => {
      console.log(resultado);
      if(resultado){
        const updatedChamado = ref.componentInstance.formChamados.value
        console.log(updatedChamado);

          this.chamService.editarChamados(updatedChamado, id).subscribe((a)=> {
          this.chamService.getChamados().subscribe()
        })
      }
    })
  }

  atribuirFuncionario(id: number) {
    let chamado = this.chamado.find((c)=> c.idChamado == id) as Chamados
    const ref = this.dialog.open(AtribuirFuncionarioComponent);
    ref.componentInstance.chamado = chamado

    ref.afterClosed().subscribe(() => {
      this.recuperarChamado()
    });
  }
}
