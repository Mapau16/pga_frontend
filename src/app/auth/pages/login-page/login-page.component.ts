import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Ilogin } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

    public _pattern: string = '/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/';

    constructor(private _fb: FormBuilder,
                private _authService: AuthService,
    ) { }

    public loginForm = this._fb.nonNullable.group({
      email: ['', [ Validators.required, Validators.pattern(this._pattern) ]],
      password: ['', Validators.required]
    });

    public login(): void {

      const body = {
        email: this.loginForm.controls.email.value,
        password: this.loginForm.controls.password.value
      };

      this._authService.login(body)
        .subscribe(res => console.log(res))

    }
}
