import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Pagamento } from '../models/pagamento';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  
  private readonly url:string = "http://localhost:8080/servicos/pagamentos"
  public atualizarPagamento$:BehaviorSubject<boolean> = new BehaviorSubject(true)


  constructor(
    private http: HttpClient
    ) { }


  getPagamentos():Observable<Pagamento[]> {
   return this.http.get<Pagamento[]>(this.url)
  }

  getPagamentosById(id:number):Observable<Pagamento> {
    return this.http.get<Pagamento>(`${this.url}/${id}`)
  }

  cadastrarPagamento(pag: Pagamento):Observable<Pagamento> {
    return this.http.post<Pagamento>(`${this.url}`, pag)
    .pipe(
      tap(() => {
      this.atualizarPagamento$.next(true)
    }))
  }

  AtualizarPagamentos(pag: Pagamento):Observable<Pagamento> {
    return this.http.put<Pagamento>(`${this.url}/${pag.idPagamento}`, pag)
    .pipe(
      tap(() => {
      this.atualizarPagamento$.next(true)
    }))
  }
}
