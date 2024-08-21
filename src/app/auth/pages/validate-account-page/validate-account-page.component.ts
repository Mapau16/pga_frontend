import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-validate-account-page',
  templateUrl: './validate-account-page.component.html',
  styleUrl: './validate-account-page.component.css'
})
export class ValidateAccountPageComponent implements OnInit {

  private token:string = '';

  constructor(private route: ActivatedRoute, 
              private authservice: AuthService, 
              private _router:      Router,) {}


  ngOnInit(): void {
    this.route.params.subscribe(param => this.token = param['token'])
    this.authservice.validateAccount(this.token)
      .subscribe({
        next: (() => {
          Swal.fire('Exito', 'Cuenta validada correctamente', 'success')
          setTimeout(() => {
            this._router.navigateByUrl('/')
          },500);
        }),
        error: (() => Swal.fire('Error', 'El token ha expirado', 'error')),
      })
    
  }
}

