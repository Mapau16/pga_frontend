import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  public _pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  constructor(private _fb: FormBuilder,
    private _authService: AuthService) { }

  public registerForm = this._fb.nonNullable.group({
    username: ['',Validators.required],
    email: ['', [Validators.required, Validators.pattern(this._pattern)]],
    password: ['', Validators.required]
  });

  public register(){
    this.registerForm.markAllAsTouched()
    if (this.registerForm.invalid) return
  const registerData = this.registerForm.value;

  this._authService.register(registerData)
  .subscribe({
    next: () => Swal.fire('Exito','Se envío un correo para validar su cuenta', 'success'),
    error: (error) => {
      Swal.fire('Error', error, 'error')}
  })
  }

  
}
