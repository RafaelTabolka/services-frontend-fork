import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/clientes/models/cliente';
import { ClientesService } from 'src/app/clientes/services/clientes.service';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';
import { Chamados } from '../../interface/chamado';
import { ChamadosServiceService } from '../../service/chamados-service.service';

@Component({
  selector: 'app-form-chamados',
  templateUrl: './form-chamado.component.html',
  styleUrls: ['./form-chamado.component.css'],
})
export class FormChamadoComponent implements OnInit {
  formChamado: FormGroup = this.fb.group({
    idChamado: ['', [Validators.required]],
    titulo: ['', [Validators.required]],
    descricao: [''],
    cliente: ['', [Validators.required]]
  });

  chamados!: Chamados[];
  funcionarios!: Funcionario[];
  clientes!: Cliente[];
  salvarChamado: boolean = false;

  constructor(
    private fb: FormBuilder,
    private chamadoService: ChamadosServiceService,
    private dialogRef: MatDialogRef<FormChamadoComponent>,
    private snackbar: MatSnackBar,
    private clienteService: ClientesService
  ) {}

  ngOnInit(): void {
    this.buscarTodosOsClientes()
  }

  salvar(): void {
    this.salvarChamado = true
    const c: Chamados = this.formChamado.value
    let obsSalvar: Observable<any>
    const idCliente = this.formChamado.value.cliente
    c.cliente = null
    console.log(c)

    obsSalvar = this.chamadoService.cadastrarChamados(c, idCliente)

    obsSalvar.subscribe(
      () => {
        this.snackbar.open('Chamado Cadastrado!', 'Ok', {
          verticalPosition: 'top',
          duration: 3000,
        });
      },
      () => {
        this.snackbar.open('Falha ao cadastrar o chamado!', 'Ok', {
          verticalPosition: 'top',
          duration: 3000,
        });
      })
    this.dialogRef.close()
  }

  buscarTodosOsClientes() {
    this.clienteService.getClientes().subscribe((newValues) => {
      this.clientes = newValues;
    });
  }
}
