import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cliente } from 'src/app/clientes/models/cliente';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';
import { Chamados } from '../interface/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadosServiceService {

  private readonly url:string = "http://localhost:8080/servicos/chamados"
  public update$:BehaviorSubject<boolean> = new BehaviorSubject(true)


  constructor(private http:HttpClient) { }

  

  getChamados():Observable<Chamados[]> {
   return this.http.get<Chamados[]>(this.url)
  }

  getChamadosId(id:number):Observable<Chamados> {
    return this.http.get<Chamados>(`${this.url}/${id}`)
  }

  deleteChamadosById(id:number):Observable<Chamados>{
    return this.http.delete<Chamados>(`${this.url}/${id}`).pipe(tap(() => {
      this.update$.next(true)
    }))
  }

  cadastrarChamados(office:Chamados, cliente: Cliente):Observable<Chamados> {
    return this.http.post<Chamados>(`${this.url}/${cliente.idCliente}`, office).pipe(tap(() => {
      this.update$.next(true)
    }))
  }

  editarChamados(office:Chamados):Observable<Chamados> {
    return this.http.put<Chamados>(`${this.url}/${office.idChamado}`, office)
    .pipe(tap(() => {
      this.update$.next(true)
    }))
  }
}
