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

  cadastrarChamados(chamado:Chamados, idCliente?: number):Observable<Chamados> {
    return this.http.post<Chamados>(`${this.url}/${idCliente}`, chamado)
    .pipe(tap(() => {
      this.update$.next(true)
    }))
  }

  editarChamados(chamado:Chamados, id: number):Observable<Chamados> {
    return this.http.put<Chamados>(`${this.url}/${id}`, chamado)
    .pipe(tap(() => {
      this.update$.next(true)
    }))
  }

  atribuirFuncionario(idChamado?: number, idFuncionario?: number):Observable<Chamados> {
    return this.http.put<Chamados>(`${this.url}AtribuirFuncionario/${idChamado}/${idFuncionario}`, null)
    .pipe(tap(() => {
      this.update$.next(true)
    }))
  }
}
