import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Chamados } from '../../interface/chamado';
import { ChamadosServiceService } from '../../service/chamados-service.service';


@Component({
  selector: 'app-form-chamados',
  templateUrl: './form-chamado.component.html',
  styleUrls: ['./form-chamado.component.css']
})
export class FormChamadoComponent implements OnInit {

  formChamado: FormGroup = this.fb.group({
    idChamado: ['', [ Validators.required ]],
    titulo:['', [Validators.required]],
    descricao: [''],
    dataEntrada: ['',[Validators.required]],
    funcionario:[''],
    cliente:['',[Validators.required]]
    
  })

  salvarChamado: boolean = false


  constructor(
    private fb: FormBuilder,
    private funcChamado: ChamadosServiceService,
    private dialogRef: MatDialogRef<FormChamadoComponent>, 
    private snackbar: MatSnackBar 
  ) { }

  ngOnInit(): void {
  }

  

  salvar(): void {
    this.salvarChamado = true
    const c: Chamados = this.formChamado.value
    let obsSalvar: Observable<any>
    let idCliente = this.formChamado.value.cliente
    console.log(idCliente)


   /* obsSalvar = this.funcChamado.cadastrarChamados(c, idCliente)
    console.log(c)
  
    obsSalvar.subscribe(
      (resultado) => {
       
        if (resultado instanceof Promise) {
         
          resultado.then((obs$) => {
            
            obs$.subscribe(
              () => {
                
                this.snackbar.open('Chamado salvo com sucesso', 'Ok', {
                  duration: 3000
                })
                this.dialogRef.close()
              }
            )
          })
        } else {
          
          this.snackbar.open('Chamado salvo com sucesso', 'Ok', {
            duration: 3000
          })
          this.dialogRef.close()
        }
      }
    )*/
  }
}
