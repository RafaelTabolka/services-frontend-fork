import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  funcionario!: Funcionario

  formFuncionario: FormGroup = this.fb.group({
    nome: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]]
  })

  imagePreview: string = ''
  foto!: File
  desabiltar: boolean = true

  constructor(
    private route: ActivatedRoute, // acessar os parâmetros da rota ativa
    private funcService: FuncionarioService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // let idFuncionario = this.route.snapshot.paramMap.get('idFuncionario')
    this.route.paramMap.subscribe(
      (params) => {
        let idFuncionario = parseInt(params.get('idFuncionario') ?? '0')
        this.recuperarFuncionario(idFuncionario)
      }
    )
  }

  recuperarFuncionario(id: number): void {
    this.funcService.getFuncionarioById(id)
    .pipe(
      tap(func => {
        this.formFuncionario.setValue({
          nome: func.nome,
          email: func.email
        })

        this.imagePreview = func.foto
        this.valorMudou()
      })
    )
    .subscribe(
      func => {
        this.funcionario = func
      }
    )
  }

  recuperarFoto(event: any): void {
    this.foto = event.target.files[0]

    const reader = new FileReader()

    reader.readAsDataURL(this.foto)

    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
  }

  valorMudou() {
    this.formFuncionario.valueChanges
    .subscribe(
      ({ nome, email }) => {
        this.desabiltar = !(nome != this.funcionario.nome || email != this.funcionario.email) || this.formFuncionario.invalid
      }
    )
  }
}
