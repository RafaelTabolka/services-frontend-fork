import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat/'
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { DialogExcluirCargoComponent } from './cargos/components/dialog-excluir-cargo/dialog-excluir-cargo.component';
import { DialogEditarCargoComponent } from './cargos/components/dialog-editar-cargo/dialog-editar-cargo.component';
import { RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { AtribuirFuncionarioComponent } from './chamados/components/atribuir-funcionario/atribuir-funcionario.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogExcluirCargoComponent,
    DialogEditarCargoComponent,
    AtribuirFuncionarioComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
