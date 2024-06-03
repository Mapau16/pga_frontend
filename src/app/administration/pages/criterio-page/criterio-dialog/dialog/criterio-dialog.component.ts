import { Component, Inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICriterio, ICriterioStatus } from '../../../../interfaces/criterio.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CriterioService } from '../../../../services/criterio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criterio-dialog',
  templateUrl: './criterio-dialog.component.html',
  styleUrl: './criterio-dialog.component.css'
})
export class CriterioDialogComponent implements OnInit {

  public idCriterio: string = '';
  public criterioDialogForm: FormGroup = this._fb.nonNullable.group({
    name: ['', Validators.required],
    enabled: [true, Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<CriterioDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ICriterio,
              private _fb: FormBuilder,
              private _criterioService: CriterioService,) { }

  ngOnInit(): void {
    if (this.data) {
      this.idCriterio = this.data._id!;
      this.criterioDialogForm.reset({
        name: this.data.name,
        enabled: this.data.enabled
      });      
    }
  }

  public onSubmitForm() {
    if (this.idCriterio)
      this.updateCriterio();
    else
      this.saveCriterio();
  }

  public saveCriterio() {
    this._validateForm();
    const body = this._mapCriterioBody();

    this._criterioService.saveCriterio(body)
      .subscribe({
        next: (() => { 
          this.onClose();
          Swal.fire('Exito', 'Criterio creado correctamente', 'success');
        }),
        error: (error => Swal.fire('Error', error, 'error'))
      })
  }
  
  public updateCriterio() {

    this._validateForm();
    const body = this._mapCriterioBody();

    this._criterioService.updateCriterio(this.idCriterio, body)
      .subscribe({
        next: (() => this.onClose()),
        error: (error => Swal.fire('Error', error, 'error'))
      })
  }

  private _mapCriterioBody() {
    const formValues = this.criterioDialogForm.value;
    return {
      name: formValues.name,
      enabled: formValues.enabled,
      items: this._criterioService.criterioItems(),
    }
  }

  private _validateForm(): void {
    this.criterioDialogForm.markAllAsTouched();
    if (this.criterioDialogForm.invalid) return;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  public addCriterioItem(event: any) {
    this._criterioService.criterioItems.update(items => [...items, event]);
  }
}

