import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClient } from '../../../interfaces/client.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients-dialog',
  templateUrl: './clients-dialog.component.html',
  styleUrl: './clients-dialog.component.css'
})
export class ClientsDialogComponent implements OnInit {

  public idClient: string = ''; 
  public clientDialogForm: FormGroup = this._fb.nonNullable.group({
    name: ['', Validators.required],
    enabled: [true, Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<ClientsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IClient,
              private _fb: FormBuilder,
              private _clientService: ClientService) { }

  ngOnInit(): void {
    if (this.data) {
      this.idClient = this.data._id;
      this.clientDialogForm.reset({
        name: this.data.name,
        enabled: this.data.enabled
      });      
    }
  }

  public onSubmitForm() {
    if (this.idClient)
      this.updateClient();
    else
      this.saveClient();
  }

  public saveClient() {
    this._validateForm();
    const body = this.clientDialogForm.value;

    this._clientService.saveClient(body)
      .subscribe({
        next: (() => { 
          this.onClose();
          Swal.fire('Exito', 'Usuario creado correctamente', 'success');
        }),
        error: (error => Swal.fire('Error', error, 'error'))
      })
    
  }
  
  public updateClient() {

    this._validateForm();
    const body = this.clientDialogForm.value;

    this._clientService.updateClient(this.idClient, body)
      .subscribe({
        next: (() => this.onClose()),
        error: (error => Swal.fire('Error', error, 'error'))
      })
  }

  private _validateForm(): void {
    this.clientDialogForm.markAllAsTouched();
    if (this.clientDialogForm.invalid) return;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
