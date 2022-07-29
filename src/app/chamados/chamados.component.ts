import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MatDateFormats, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { ConfirmarDelecaoComponent } from '../funcionarios/components/confirmar-delecao/confirmar-delecao.component';
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
    cliente:['',[Validators.required]],
    pagamento:['']
  })

  private _destroyed = new Subject<void>();

  chamado!: Chamados
  desabilitar: boolean = true
  naoEncontrado: boolean = false

  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  constructor(
    private fb: FormBuilder,    
    private chamadoService: ChamadosServiceService,
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router, 
    public authService: AuthService,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,

  ) { }

  ngOnInit(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
 
  get periodLabel() {
    return this._dateAdapter
      .format(this._calendar.activeDate, this._dateFormats.display.monthYearLabel)
      .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate, 1);
  }

  recuperarChamado(id: number): void {
    this.chamadoService.getChamadosId(id)
    .subscribe(
      cham => {
       
        this.chamado = cham

          this.formChamados.setValue({
          idChamado: this.chamado.idChamado,  
          titulo: this.chamado.titulo,
          descricao: this.chamado.descricao,
          dataEntrada: this.chamado.dataEntrada,
          status: this.chamado.status,
          funcionario: this.chamado.funcionario  

        })

        this.valorMudou()
      },
      (erro: HttpErrorResponse) => {
        this.naoEncontrado = erro.status == 404
      }
    )
  }

  

  valorMudou() {
  
    this.formChamados.valueChanges
    .subscribe(
     
      (valores) => {
     
        this.desabilitar = this.formChamados.invalid || !(valores.idChamado != this.chamado.idChamado || valores.titulo != this.chamado.titulo || valores.descricao != this.chamado.descricao || valores.dataEntrada != this.chamado.dataEntrada || valores.status != this.chamado.status ||  valores.funcionario != this.chamado.funcionario )
      }
    )
  }

  salvarAtualizacoes() {
    const c: Chamados = { ...this.formChamados.value }
    c.idChamado = this.chamado.idChamado
   
    
    const obsSalvar: Observable<any> = this.chamadoService.editarChamados(c )

    obsSalvar
    .subscribe(
      (resultado) => {
        if (resultado instanceof Observable<Chamados>) {
          resultado
          .subscribe(
            (func) => {
              this.snackbar.open('Chamado salvo com sucesso', 'Ok', {
                duration: 3000
              })

              this.recuperarChamado(func.id)
            }
          )
        }

        this.snackbar.open('Chamado salvo com sucesso', 'Ok', {
          duration: 3000
        })

        this.recuperarChamado(resultado.id)
      }
    )
  }

 /*excluirChamado(): void {
    this.dialog.open(ConfirmarDelecaoComponent)
    .afterClosed()
    .subscribe(
      (deletar) => {
        if (deletar) {
          this.formChamados.excluirChamado(this.chamado)
          .subscribe(
            () => {
              this.snackbar.open('Chamado deletado !', 'Ok', {
                duration: 3000
              })

              this.router.navigateByUrl('/src/app/chamados/chamados-router/chamados-router.module.ts')
            }
          )
        }
      }
    )
  }*/
  

}
