import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar-pagamentos',
  templateUrl: './navbar-pagamentos.component.html',
  styleUrls: ['./navbar-pagamentos.component.css']
})
export class NavbarPagamentosComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

}
