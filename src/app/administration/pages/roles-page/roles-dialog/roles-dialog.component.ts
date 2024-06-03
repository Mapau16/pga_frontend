import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRole } from '../../../interfaces/role.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../services/role.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrl: './roles-dialog.component.css'
})
export class RolesDialogComponent implements OnInit {

  public idRole: string = ''; 
  public roleDialogForm: FormGroup = this._fb.nonNullable.group({
    name: ['', Validators.required],
    enabled: [true, Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<RolesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IRole,
              private _fb: FormBuilder,
              private _roleService: RoleService,
            private _auth: AuthService) { }

  ngOnInit(): void {
    if (this.data) {
      this.idRole = this.data._id;
      this.roleDialogForm.reset({
        name: this.data.name,
        enabled: this.data.enabled
      });      
    }
  }

  public onSubmitForm() {
    if (this.idRole)
      this.updateRole();
    else
      this.saveRole();
  }

  public saveRole() {
    this._validateForm();
    const body = this.roleDialogForm.value;

    this._roleService.saveRole(body)
      .subscribe({
        next: (() => { 
          this.onClose();
          Swal.fire('Exito', 'Rol creado correctamente', 'success');
        }),
        error: (error => Swal.fire('Error', error, 'error'))
      })
  }
  
  public updateRole() {

    this._validateForm();
    const body = this.roleDialogForm.value;

    this._roleService.updateRole(this.idRole, body)
      .subscribe({
        next: (() => this.onClose()),
        error: (error => Swal.fire('Error', error, 'error'))
      })
  }

  private _validateForm(): void {
    this.roleDialogForm.markAllAsTouched();
    if (this.roleDialogForm.invalid) return;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
