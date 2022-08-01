import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChamadosComponent } from '../chamados.component'
import { ListarChamadosComponent } from '../listar-chamados/listar-chamados.component';

const routes: Routes = [
{
  path:'',
  component: ListarChamadosComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChamadosRouterRoutingModule { }
