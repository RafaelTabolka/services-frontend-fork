import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { Chamados } from './interface/chamado';
import { ChamadosServiceService } from './service/chamados-service.service';

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.css']
})
export class ChamadosComponent<D> implements OnInit {

    formChamados: FormGroup = this.fb.group({
    idChamado: ['', [ Validators.required ]],
    titulo: ['', [ Validators.required]],
    descricao: [''],
    dataEntrada: ['', [Validators.required]],
    status:['', [Validators.required]],
    funcionario:['',[Validators.required]],
    cliente:['',[Validators.required]]
  
  })



  chamado!: Chamados
  disabledButton: boolean = true;
  naoEncontrado: boolean = false

  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  constructor(
    private fb: FormBuilder,    
    private chamadoService: ChamadosServiceService,  
    private title : Title,
    public authService: AuthService
  
  ) { }

  ngOnInit(): void {

    this.disabledButtonFunction()
    this.title.setTitle("Editar Chamado")

  }


  disabledButtonFunction() {
    this.formChamados.valueChanges.subscribe((valuesChanges) => {
      this.chamadoService.getChamadosId(valuesChanges.idChamado) 
      .subscribe((valuesChamadoId) => {
        this.disabledButton =
         this.formChamados.invalid ||
         !(valuesChanges.titulo !=valuesChamadoId.titulo ||
           valuesChanges.descricao != valuesChamadoId.descricao ||
           valuesChanges.dataEntrada != valuesChamadoId.dataEntrada ||
           valuesChanges.status != valuesChamadoId.status || 
           valuesChanges.funcionario != valuesChamadoId.funcionario.idFuncionario ||
           valuesChanges.cliente != valuesChamadoId.cliente?.idCliente)
      })  
    });
  }
}
