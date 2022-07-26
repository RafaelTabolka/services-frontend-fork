import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentosRoutingModule } from './pagamentos.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';
import { ListarPagamentosComponent } from './pages/listar-pagamentos/listar-pagamentos.component';
import { NavbarPagamentosComponent } from './components/navbar-pagamentos/navbar-pagamentos.component';
import { FormPagamentosComponent } from './components/form-pagamentos/form-pagamentos.component';



@NgModule({
  declarations: [ 
    ListarPagamentosComponent,
    PagamentoComponent,
    NavbarPagamentosComponent,
    FormPagamentosComponent
  ],
  imports: [
    CommonModule,
    PagamentosRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class PagamentosModule { }
