import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, debounceTime, switchMap, tap } from 'rxjs';
import { GuidelineService } from '../../../../services/guideline.service';
import { ProcessService } from '../../../../services/process.service';
import { QuestionService } from '../../../../services/question.service';
import { IGuideline } from '../../../../interfaces/guideline.interface';
import { IProcess } from '../../../../interfaces/process.interface';
import { IQuestion } from '../../../../interfaces/question.interface';
import Swal from 'sweetalert2';

interface Item {
  _id: string;
  name: string;
  enabled: boolean;
}

interface IEvent {
  control: 'guideline' | 'process' | 'question';
  item: Item;
}

@Component({
  selector: 'dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.css'
})
export class DialogFormComponent implements OnInit {

  @Output() newCriterioItem = new EventEmitter<any>();

  constructor(private _fb: FormBuilder,
    private _guidelineService: GuidelineService,
    private _processService: ProcessService,
    private _questionService: QuestionService,
  ) { }

  public guidelines: IGuideline[] = [];
  public processes: IProcess[] = [];
  public questions: IQuestion[] = [];

  public criteriosForm: FormGroup = this._fb.nonNullable.group({
    guideline: ['', Validators.required],
    process: ['', Validators.required],
    question: ['', Validators.required],
  });

  public criterio: any = {
    guideline: '',
    process: '',
    question: '',
    observation: '',
    status: 'CUMPLE',
  }

  ngOnInit(): void {

    this.criteriosForm.get('guideline')?.valueChanges.pipe(
      debounceTime(500),
      switchMap((value) => (value ? this._guidelineService.searchGuidelineByName(value) : EMPTY))
    ).subscribe(res => this.guidelines = res);

    this.criteriosForm.get('process')?.valueChanges.pipe(
      debounceTime(500),
      switchMap((value) => (value ? this._processService.searchProcessByName(value) : EMPTY))
    ).subscribe(res => this.processes = res);

    this.criteriosForm.get('question')?.valueChanges.pipe(
      debounceTime(500),
      switchMap((value) => (value ? this._questionService.searchQuestionByName(value) : EMPTY))
    ).subscribe(res => this.questions = res);

  }

  selectedElement(event: IEvent) {
    this.criterio[event.control] = event.item;
  }

  public addCriterioItem(): void {

    if (this._validateCriterioForm(this.criterio)) return;
    this.newCriterioItem.emit(this.criterio);
    this.criterio = {};
    this.criteriosForm.reset();
  }

  private _validateCriterioForm(criterio: any): boolean {
    const { guideline, process, question } = criterio
    if (guideline === "" && process === "" && question === "") {
      Swal.fire('Error', 'Debe seleccionar un lineamiento, un proceso y una pregunta', 'error');
      return true;
    }
    return false;
  }

}
