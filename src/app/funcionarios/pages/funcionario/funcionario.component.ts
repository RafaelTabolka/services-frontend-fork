import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cargos } from 'src/app/cargos/interface/cargos';
import { CargosServiceService } from 'src/app/cargos/service/cargos-service.service';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {

  
  formFuncionario: FormGroup = this.fb.group({
    nome: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    foto: [''],
    cargo:['', [Validators.required]]
  })
  
  funcionario!: Funcionario
  funcionarios!: Funcionario[]
  imagePreview: string = ''
  foto!: File // undefined
  desabilitar: boolean = true
  naoEncontrado: boolean = false
  cargos!:Cargos[]

  constructor(
    private route: ActivatedRoute, // acessar os parâmetros da rota ativa
    private funcService: FuncionarioService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router, // serve para fazer o redirecionamento entre as páginas do app pelo ts
    private cargosService: CargosServiceService,
    private title:Title
    ) { }

  ngOnInit(): void {
    // let idFuncionario = this.route.snapshot.paramMap.get('idFuncionario')
    this.route.paramMap.subscribe(
      (params) => {
        let idFuncionario = parseInt(params.get('idFuncionario') ?? '0')
        this.recuperarFuncionario(idFuncionario)

        this.funcService.getFuncionarioById(idFuncionario).subscribe(() => {
          this.title.setTitle("Funcionário " + this.formFuncionario.value.nome)
        })
      }
    )
    this.getAllOffices()
  }

  recuperarFuncionario(id: number): void {
    this.funcService.getFuncionarioById(id)
    .subscribe(
      func => {
        //1° pegar o funcionário que foi retornado e colocar dentro da propriedade funcionario
        this.funcionario = func

        // 2° pegar os dados do funcionário e atribuir esses valores aos seus respectivos campos
        // no formulário

        /**
         * setValue() é responsável por pegar os valores que foram passados para ela
         * e colocar dentro dos formControls
         */
        
        console.log(this.funcionario.cargo.idCargo);
        if(this.funcionario.cargo.idCargo != undefined){
        this.formFuncionario.setValue({
          nome: this.funcionario.nome,
          email: this.funcionario.email,
          foto:'',
          cargo:this.funcionario.cargo.idCargo
        })
      }

        // 3° carregar o preview da imagem
        this.imagePreview = this.funcionario.foto

        this.valorMudou()
      },
      (erro: HttpErrorResponse) => {
        this.naoEncontrado = erro.status == 404
      }
    )
  }

  recuperarFoto(event: any): void {
    this.foto = event.target.files[0]

    const reader = new FileReader() // objeto do js que faz leitura de arquivos

    reader.readAsDataURL(this.foto) // ler o arquivo e gerar um link local para o acesso do conteúdo daquele arquivo

    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
  }

  valorMudou() {
    /**
     * valueChanges é uma propriedade dos FormGroups
     * que é um observable que quando um valor do seu formulário
     * altera, esse observable te retorna essa modificação
     */
    this.formFuncionario.valueChanges
    .subscribe(
      /**
       * o parâmetro valores é um objeto que é retornado te informando
       * o valor de cada campo do seu reative forms
       */
      (valores) => {
        
        /**
         * o botão será desabilitado se as validações do formulário estiverem inválidas
         * ou se o valor de algum campo do formulário estiver diferente do valor de alguma
         * propriedade do objeto funcionário
         */
        this.desabilitar = this.formFuncionario.invalid || !(valores.nome != this.funcionario.nome || valores.email != this.funcionario.email || valores.cargo != this.funcionario.cargo.idCargo || valores.foto.length > 0)
        
      }
    )
  }

  salvarAtualizacoes() {
    const f: Funcionario = { ...this.formFuncionario.value }
    f.idFuncionario = this.funcionario.idFuncionario
    f.foto = this.funcionario.foto
    const cargo = this.cargos.find((cargo)=>{
      return cargo.idCargo == this.formFuncionario.value.cargo
    })
    f.cargo = cargo as Cargos

    const temFoto:boolean = this.formFuncionario.value.foto.length > 0

    const obsSalvar: Observable<any> = this.funcService.atualizarFuncionario(f, temFoto ? this.foto : undefined)
    console.log(f);
    
   obsSalvar
    .subscribe(
      (resultado) => {
        if (resultado instanceof Observable<Funcionario>) {
          console.log(resultado);
          
          resultado
          .subscribe(
            (func) => {
              this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
                duration: 3000
              })

              this.recuperarFuncionario(func.idFuncionario)
            }
          )
        }
        else{
        this.snackbar.open('Funcionário salvo com sucesso', 'Ok', {
          duration: 3000
        })

        this.recuperarFuncionario(resultado.idFuncionario)
        }
      }
    )  
  }

  deletar(): void {
    const ref = this.dialog.open(ConfirmarDelecaoComponent)

    ref.afterClosed().subscribe(
      (deletar) => {
        if (deletar) {
          this.funcService.deleteFuncionario(this.funcionario)
          .subscribe(
            () => {
              this.snackbar.open('Funcionário deletado', 'Ok', {
                duration: 3000
              })
              this.router.navigateByUrl('/funcionarios')
            }
          )
        }
      }
    )
  }

  getAllOffices() {
    this.cargosService.getAllOffices().subscribe((newValue) => {
      this.cargos = newValue
    })
  }
}
