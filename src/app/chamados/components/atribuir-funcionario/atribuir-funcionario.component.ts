import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
import { Chamados } from '../../interface/chamado';
import { ChamadosServiceService } from '../../service/chamados-service.service';

@Component({
  selector: 'app-atribuir-funcionario',
  templateUrl: './atribuir-funcionario.component.html',
  styleUrls: ['./atribuir-funcionario.component.css']
})
export class AtribuirFuncionarioComponent implements OnInit {

  formAtribuirFuncionario: FormGroup = this.fb.group({
    funcionario:['']
  })

  desabilitar: boolean = true
  naoEncontrado: boolean = false
  funcionarios!: Funcionario[]
  chamado!: Chamados

  constructor(
    private funcionariosService: FuncionarioService,
    private fb: FormBuilder,
    private chamadoService: ChamadosServiceService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.valorMudou()
    this.todosFuncionarios()
  }

  valorMudou() {
    this.formAtribuirFuncionario.valueChanges.subscribe((valuesChanges) => {
    this.desabilitar =
    this.formAtribuirFuncionario.invalid ||
    !(valuesChanges.idChamado != this.chamado.idChamado ||
      valuesChanges.funcionario != this.chamado.funcionario)
    })
  }

   recuperarChamados(id: number): void {
    this.chamadoService.getChamadosId(id)
    .subscribe(
      cham => {
        this.chamado = cham
        this.formAtribuirFuncionario.setValue({
          funcionario: this.funcionarios
        })
      },
      (erro: HttpErrorResponse) => {
        this.naoEncontrado = erro.status == 404
      }
    )
  }

  salvar() {
    const idC = this.chamado.idChamado
    const idF = this.formAtribuirFuncionario.value.funcionario

    const obsSalvar: Observable<any> = this.chamadoService.atribuirFuncionario(idC, idF)

    obsSalvar.subscribe((resultado) => {
      if(resultado instanceof Observable<Chamados>) {
        resultado
        .subscribe(
          (cham) => {
            this.snackbar.open('Chamado salvo com sucesso', 'Ok', {
              duration: 3000
            })

            this.recuperarChamados(cham.idChamado)
          }
        )
      }
    })
  }

  todosFuncionarios() {
    this.funcionariosService.getFuncionarios().subscribe((newValues) => {
      this.funcionarios = newValues
    })
  }
}
