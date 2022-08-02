import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    login: ['', [ Validators.required ]],
    password: ['', [ Validators.required ]],
    recaptcha:['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Login")
  }

  login(): void {
    const credenciais = { login: this.loginForm.value.login, password: this.loginForm.value.password }

    this.authService.signIn(credenciais)
    .subscribe(
      () => {
        this.snackbar.open('Logado com sucesso', 'Ok', {
          verticalPosition:"top",
          duration: 3000
        })

        this.router.navigateByUrl('/funcionarios')
      },
      () => {
        this.snackbar.open("Login ou senha incorretos!", "Ok" ,{
          verticalPosition:"top",
          duration:4000
        })
      }
    )
  }
}
