import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProcess } from '../../../interfaces/process.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProcessService } from '../../../services/process.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-process-dialog',
  templateUrl: './process-dialog.component.html',
  styleUrl: './process-dialog.component.css'
})
export class ProcessDialogComponent implements OnInit {

  public idProcess: string = ''; 
  public processDialogForm: FormGroup = this._fb.nonNullable.group({
    name: ['', Validators.required],
    enabled: [true, Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<ProcessDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IProcess,
              private _fb: FormBuilder,
              private _processService: ProcessService,) { }

  ngOnInit(): void {
    if (this.data) {
      this.idProcess = this.data._id;
      this.processDialogForm.reset({
        name: this.data.name,
        enabled: this.data.enabled
      });      
    }
  }

  public onSubmitForm() {
    if (this.idProcess)
      this.updateProcess();
    else
      this.saveProcess();
  }

  public saveProcess() {
    this._validateForm();
    const body = this.processDialogForm.value;

    this._processService.saveProcess(body)
      .subscribe({
        next: (() => { 
          this.onClose();
          Swal.fire('Exito', 'Proceso creado correctamente', 'success');
        }),
        error: (error => Swal.fire('Error', error, 'error'))
      })
  }
  
  public updateProcess() {

    this._validateForm();
    const body = this.processDialogForm.value;

    this._processService.updateProcess(this.idProcess, body)
      .subscribe({
        next: (() => this.onClose()),
        error: (error => Swal.fire('Error', error, 'error'))
      })
  }

  private _validateForm(): void {
    this.processDialogForm.markAllAsTouched();
    if (this.processDialogForm.invalid) return;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
