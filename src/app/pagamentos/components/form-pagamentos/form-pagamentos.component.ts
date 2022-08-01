import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pagamento } from '../../models/pagamento';
import { PagamentoService } from '../../services/pagamento.service';

@Component({
  selector: 'app-form-pagamentos',
  templateUrl: './form-pagamentos.component.html',
  styleUrls: ['./form-pagamentos.component.css']
})
export class FormPagamentosComponent implements OnInit {

  pagamentos: Pagamento[] = []

  formPagamentos: FormGroup = this.fb.group({
    idPagamento: ['', [ Validators.required ]],
    valor: ['', [ Validators.required ]],
    formPagamento: ['', [ Validators.required ]]
  })

  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  salvandoPagamento: boolean = false

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private pagService: PagamentoService,
    private nav: Router
  ) { }

  ngOnInit(): void {
  }

  cadastrarPagamentos() {
    this.salvandoPagamento = true
    const pag: Pagamento = this.formPagamentos.value;

    console.log(pag);
    
    this.pagService.cadastrarPagamento(pag)
    .subscribe(
      () => {
      this.pagService.getPagamentos().subscribe((newValues) => {
        this.pagamentos = newValues
      });
    });
    this.snackBar.open('Pagamento cadastrado com sucesso!', 'Ok', {
      verticalPosition: 'top',
      duration: 5000,
    });
    this.nav.navigateByUrl('/pagamentos');
  }
}