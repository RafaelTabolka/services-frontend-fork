import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChamadosRouterRoutingModule } from './chamados-router-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/material/material.module';
import { ChamadosComponent } from '../chamados.component';
import { ListarChamadosComponent } from '../listar-chamados/listar-chamados.component';
import { FormChamadoComponent } from '../components/form-chamado/form-chamado.component';
import { CompartilharComponentesModule } from 'src/app/compartilhar-componentes/compartilhar-componentes.module';
import { DialogExcluirChamadosComponent } from '../components/dialog-excluir-chamado/dialog-excluir-chamado.component';


@NgModule({
  declarations: [
    ChamadosComponent,
    ListarChamadosComponent,
    FormChamadoComponent,
    DialogExcluirChamadosComponent

  ],
  imports: [
    CommonModule,
    ChamadosRouterRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    CompartilharComponentesModule
  ]
})
export class ChamadosRouterModule { }
