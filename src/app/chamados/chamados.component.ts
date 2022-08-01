import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Funcionario } from '../funcionarios/models/funcionario';
import { FuncionarioService } from '../funcionarios/services/funcionario.service';
import { Chamados } from './interface/chamado';
import { ChamadosServiceService } from './service/chamados-service.service';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.css']
})
export class ChamadosComponent<D> implements OnInit {

    formChamados: FormGroup = this.fb.group({
    titulo: ['', [ Validators.required]],
    descricao: [''],
    dataEntrada: ['', [Validators.required]],
    status:['', [Validators.required]],
    funcionario:[''],
    cliente:['',[Validators.required]]
  
  })



  chamado!: Chamados
  disabledButton: boolean = true;
  naoEncontrado: boolean = false
  funcionarios!: Funcionario[]

  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  constructor(
    private fb: FormBuilder,    
    private chamadoService: ChamadosServiceService,  
    private title : Title,
    public authService: AuthService,
    private funcionariosService: FuncionarioService
    
  
  ) { }

  ngOnInit(): void {

    this.disabledButtonFunction()
    this.title.setTitle("Editar Chamado")
    this.formChamados.setValue({
    titulo: this.chamado.titulo,
    descricao: this.chamado.descricao,
    dataEntrada: this.chamado.dataEntrada,
    status: this.chamado.status,
   /*  funcionario: this.chamado.funcionario,
    cliente: this.chamado.cliente */
  
    })
    this.todosFuncionarios()


  }


  disabledButtonFunction() {
    
      this.formChamados.valueChanges.subscribe((valuesChanges) => {
      this.disabledButton =
      this.formChamados.invalid ||
      !(valuesChanges.idChamado != this.chamado.idChamado ||
       valuesChanges.titulo !=this.chamado.titulo ||
        valuesChanges.descricao != this.chamado.descricao ||
        valuesChanges.status != this.chamado.status
        /* valuesChanges.funcionario != this.chamado.funcionario?.idFuncionario ||
        valuesChanges.cliente != this.chamado.cliente?.idCliente) */
        )
         
      })  

  }

  todosFuncionarios(){
    this.funcionariosService.getFuncionarios().subscribe((newValues)=>{
      this.funcionarios=newValues
    })
  }


}
