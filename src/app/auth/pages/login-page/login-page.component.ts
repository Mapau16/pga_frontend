import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Ilogin } from '../../interfaces/auth.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

    public _pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    constructor(private _fb:          FormBuilder,
                private _authService: AuthService,
                private _router:      Router,
    ) { }

    public loginForm: FormGroup = this._fb.nonNullable.group({
      email: ['joser18torres@gmail.com', [ Validators.required, Validators.pattern(this._pattern) ]],
      password: ['test', Validators.required]
    });

    public login(): void {

      this.loginForm.markAllAsTouched();
      if (this.loginForm.invalid) return;

      const { email, password } = this.loginForm.value;

      this._authService.login(email, password )
        .subscribe({
          next: () => this._router.navigateByUrl('/dashboard'),
          error: (error) => {
            Swal.fire('Error', error, 'error')
          }
        })

    }
}
