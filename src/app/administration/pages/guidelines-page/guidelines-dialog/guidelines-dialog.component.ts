import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IGuideline } from '../../../interfaces/guideline.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuidelineService } from '../../../services/guideline.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-guidelines-dialog',
  templateUrl: './guidelines-dialog.component.html',
  styleUrl: './guidelines-dialog.component.css'
})
export class GuidelinesDialogComponent implements OnInit {

  public idGuideline: string = ''; 
  public guidelineDialogForm: FormGroup = this._fb.nonNullable.group({
    name: ['', Validators.required],
    enabled: [true, Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<GuidelinesDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IGuideline,
              private _fb: FormBuilder,
              private _guidelineService: GuidelineService,
            private _auth: AuthService) { }

  ngOnInit(): void {
    if (this.data) {
      this.idGuideline = this.data._id;
      this.guidelineDialogForm.reset({
        name: this.data.name,
        enabled: this.data.enabled
      });      
    }
  }

  public onSubmitForm() {
    if (this.idGuideline)
      this.updateGuideline();
    else
      this.saveGuideline();
  }

  public saveGuideline() {
    this._validateForm();
    const body = this.guidelineDialogForm.value;

    this._guidelineService.saveGuideline(body)
      .subscribe({
        next: (() => { 
          this.onClose();
          Swal.fire('Exito', 'Lineamiento creado correctamente', 'success');
        }),
        error: (error => Swal.fire('Error', error, 'error'))
      })
  }
  
  public updateGuideline() {

    this._validateForm();
    const body = this.guidelineDialogForm.value;

    this._guidelineService.updateGuideline(this.idGuideline, body)
      .subscribe({
        next: (() => this.onClose()),
        error: (error => Swal.fire('Error', error, 'error'))
      })
  }

  private _validateForm(): void {
    this.guidelineDialogForm.markAllAsTouched();
    if (this.guidelineDialogForm.invalid) return;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

