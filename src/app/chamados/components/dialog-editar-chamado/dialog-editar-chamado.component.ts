import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chamados } from '../../interface/chamado';
import { ChamadosServiceService } from '../../service/chamados-service.service';

@Component({
  selector: 'app-dialog-editar-cargo',
  templateUrl: './dialog-editar-chamado.component.html',
  styleUrls: ['./dialog-editar-chamado.component.css'],
})
export class DialogEditarChamadosComponent implements OnInit {
  formOffice: FormGroup = this.fb.group({
    idchamado:[''],
    nome: ['', [Validators.required, Validators.maxLength(60)]],
    descricao: ['', [Validators.required, Validators.maxLength(60)]],
    
  });

  office!: Chamados;
  disabledButton: boolean = true;

  constructor(
    private fb: FormBuilder,
    private chamadoService: ChamadosServiceService
  ) {}

  ngOnInit(): void {
    this.disabledButtonFunction();
  }

  disabledButtonFunction() {
    this.formOffice.valueChanges.subscribe((valuesChanges) => { 
      this.chamadoService.getChamadosId(valuesChanges.idCargo) 
      .subscribe((valuesOfGetOfficeById) => {
        this.disabledButton =
         this.formOffice.invalid ||
         !(valuesChanges.nome != valuesOfGetOfficeById.idChamado ||
           valuesChanges.descricao != valuesOfGetOfficeById.descricao)
      })  
    });
  }
}
