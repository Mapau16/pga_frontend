import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IQuestion } from '../../../interfaces/question.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-questions-dialog',
  templateUrl: './questions-dialog.component.html',
  styleUrl: './questions-dialog.component.css'
})
export class QuestionsDialogComponent implements OnInit {

  public idQuestion: string = ''; 
  public questionDialogForm: FormGroup = this._fb.nonNullable.group({
    name: ['', Validators.required],
    enabled: [true, Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<QuestionsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IQuestion,
              private _fb: FormBuilder,
              private _questionService: QuestionService,
            private _auth: AuthService) { }

  ngOnInit(): void {
    if (this.data) {
      this.idQuestion = this.data._id;
      this.questionDialogForm.reset({
        name: this.data.name,
        enabled: this.data.enabled
      });      
    }
  }

  public onSubmitForm() {
    if (this.idQuestion)
      this.updateQuestion();
    else
      this.saveQuestion();
  }

  public saveQuestion() {
    this._validateForm();
    const body = this.questionDialogForm.value;

    this._questionService.saveQuestion(body)
      .subscribe({
        next: (() => { 
          this.onClose();
          Swal.fire('Exito', 'Pregunta creada correctamente', 'success');
        }),
        error: (error => Swal.fire('Error', error, 'error'))
      })
  }
  
  public updateQuestion() {

    this._validateForm();
    const body = this.questionDialogForm.value;

    this._questionService.updateQuestion(this.idQuestion, body)
      .subscribe({
        next: (() => this.onClose()),
        error: (error => Swal.fire('Error', error, 'error'))
      })
  }

  private _validateForm(): void {
    this.questionDialogForm.markAllAsTouched();
    if (this.questionDialogForm.invalid) return;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

