import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificacaoTokenGuard } from '../guards/verificacao-token.guard';
import { IdValidatorGuard } from './guards/id-validator.guard';
import { ListarPagamentosComponent } from './pages/listar-pagamentos/listar-pagamentos.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';

const routes: Routes = [
  {
    path:'',
    component: ListarPagamentosComponent,
    children: [
      {
        path: ':idPagamento',
        component: PagamentoComponent,
        canActivate: [
          IdValidatorGuard,
          VerificacaoTokenGuard
        ]
      }
    ],
    canActivate: [
      VerificacaoTokenGuard
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagamentosRoutingModule { }