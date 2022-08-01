import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentosRoutingModule } from './pagamentos.routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';
import { ListarPagamentosComponent } from './pages/listar-pagamentos/listar-pagamentos.component';
import { FormPagamentosComponent } from './components/form-pagamentos/form-pagamentos.component';
import { CompartilharComponentesModule } from '../compartilhar-componentes/compartilhar-componentes.module';



@NgModule({
  declarations: [ 
    ListarPagamentosComponent,
    PagamentoComponent,
    FormPagamentosComponent
  ],
  imports: [
    CommonModule,
    PagamentosRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    CompartilharComponentesModule
  ]
})
export class PagamentosModule { }
