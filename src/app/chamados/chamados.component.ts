import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth/services/auth.service';
import { Funcionario } from '../funcionarios/models/funcionario';
import { FuncionarioService } from '../funcionarios/services/funcionario.service';
import { Chamados } from './interface/chamado';


@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.css']
})
export class ChamadosComponent implements OnInit {

  formChamados: FormGroup = this.fb.group({
    titulo: ['', [ Validators.required]],
    descricao: [''],
    status:['', [Validators.required]]
  })

  chamado!: Chamados
  desabilitar: boolean = true;
  naoEncontrado: boolean = false
  funcionarios!: Funcionario[]
  idFuncionarioTemporario: number = 0

  constructor(
    private fb: FormBuilder,
    private title : Title,
    public authService: AuthService,
    private funcionariosService: FuncionarioService
  ) { }

  ngOnInit(): void {

    this.valorMudou()
    this.title.setTitle("Editar Chamado")
    this.formChamados.setValue({
    titulo: this.chamado.titulo,
    descricao: this.chamado.descricao,
    status: this.chamado.status
    })
  }

  valorMudou() {
    this.formChamados.valueChanges.subscribe((valuesChanges) => {
    this.desabilitar =
    this.formChamados.invalid ||
    !(valuesChanges.idChamado != this.chamado.idChamado ||
     valuesChanges.titulo !=this.chamado.titulo ||
     valuesChanges.descricao != this.chamado.descricao ||
     valuesChanges.status != this.chamado.status
      )
    })
  }
}
