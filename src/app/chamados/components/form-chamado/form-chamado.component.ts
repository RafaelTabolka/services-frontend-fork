import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/clientes/models/cliente';
import { ClientesService } from 'src/app/clientes/services/clientes.service';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
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
    dataEntrada: ['', [Validators.required]],
    funcionario: [''],
    cliente: ['', [Validators.required]],
  });

  chamados!: Chamados[];
  funcionarios!: Funcionario[];
  clientes!: Cliente[];
  salvarChamado: boolean = false;

  constructor(
    private fb: FormBuilder,
    private funcChamado: ChamadosServiceService,
    private dialogRef: MatDialogRef<FormChamadoComponent>,
    private snackbar: MatSnackBar,
    private clienteService: ClientesService,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit(): void {
    this.buscarTodosOsClientes();
    this.buscarTodosOsFuncionarios();
  }

  salvar(): void {
    this.salvarChamado = true;
    const c: Chamados = this.formChamado.value;
    /* const cliente = this.clientes.find((cliente) => {
      return cliente.idCliente == this.formChamado.value.cliente;
    });
    c.cliente = cliente as Cliente; */
    let idCliente = this.formChamado.value.cliente
    console.log(this.formChamado.value.funcionario);
    
    this.funcChamado.cadastrarChamados(c, idCliente).subscribe(
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
      }
    );
  }

  buscarTodosOsFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe((newValues) => {
      this.funcionarios = newValues;
    });
  }

  buscarTodosOsClientes() {
    this.clienteService.getClientes().subscribe((newValues) => {
      this.clientes = newValues;
    });
  }
}
