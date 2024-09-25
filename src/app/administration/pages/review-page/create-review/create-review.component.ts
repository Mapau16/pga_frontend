import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { StepperOrientation } from '@angular/material/stepper'
import { BreakpointObserver } from '@angular/cdk/layout';
import { CriterioService } from '../../../services/criterio.service';
import { ICriterio } from '../../../interfaces/criterio.interface';
import { ClientService } from '../../../services/client.service';
import { RoleService } from '../../../services/role.service';
import Swal from 'sweetalert2';
import { ReviewService } from '../../../services/review.service';
import { IReview } from '../../../interfaces/review.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrl: './create-review.component.css'
})
export class CreateReviewComponent {

  stepperOrientation: Observable<StepperOrientation>;

  public criterioselect: FormControl = new FormControl('', Validators.required);
  public reviewForm = this._formBuilder.group({
    name: ['', Validators.required],
    client: ['', Validators.required],
  });

  public cycleForm = this._formBuilder.group({
    name: ['', Validators.required],
    worker: ['', Validators.required],
    role: ['', Validators.required],
  });

  public criterioForm = new FormGroup({
    items: new FormArray([])
  });

  public clients: any[] = [];
  public criterios: any[] = [];
  public roles: any[] = [];
  public criterio: ICriterio|null = null;
  public showprogressbar: boolean = false;

  constructor(private _formBuilder: FormBuilder, 
              breakpointObserver: BreakpointObserver, 
              private _criterioService: CriterioService,
              private _clientService: ClientService,
              private _roleService: RoleService,
              private _reviewService: ReviewService,
              private _router: Router,) {

    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

    //FACADE
    this._criterioService.getCriterios()
      .subscribe(criterios => this.criterios = criterios);

    this._clientService.getClients()
      .subscribe(clients => this.clients = clients);

    this._roleService.getRoles()
      .subscribe(roles => this.roles = roles);
  }

  public get criterioItems() : FormArray {
    return this.criterioForm.get('items') as FormArray;
  }

  public criterioItemsValues(index: number, input: string): string{
    const data = this.criterioForm.get('items') as FormArray;
    return data.controls.at(index)?.value[input];
  }

  createItem(item: any): FormGroup {
    return this._formBuilder.group({
      guideline: item.guideline.name,
      process: item.process.name,
      question: item.question.name,
      observation: '',
      status: item.status,
    });
  }

  setCriterioForm(items: any[]) {
    items.forEach(item => {
      this.criterioItems.push(this.createItem(item));
    });
  }

  async selectCriterio(criterioid: string) {
    this.showprogressbar = true;
    await new Promise(r => setTimeout(r, 2000));
    this._criterioService.getCriterioById(criterioid)
      .subscribe(criterio => {
        this.criterio = criterio;
        this.setCriterioForm(criterio.items!);
      });    
    this.showprogressbar = false; 
  }

  saveReview(){
    // if (this.criterioselect.invalid) {
    //   this.criterioselect.markAsTouched();
    //   Swal.fire('Error', 'Debe seleccionar un criterio a evaluar', 'info');
    //   return
    // }
    // if (this.criterioForm.invalid) {
    //   this.criterioForm.markAllAsTouched()
    //   Swal.fire('Error', 'Todos los campos son obligatorios', 'info');
    //   return
    // }
    // const data = this.mapReviewData() as IReview;

    // this._reviewService.saveReview(data)
    //   .subscribe({
    //       next: () => {
    //         Swal.fire('Exito','Revisión creada correctamente', 'success');  
    //         this._router.navigate(['administration', 'review']);
    //       },
    //       error: (error) => {
    //         Swal.fire('Error', error, 'error')}
    //   });
  }

  mapReviewData() {
    const review = this.reviewForm.value;
    const cycle = this.cycleForm.value;
    const criterio = this.criterioForm.value;

    return {
      "name": review.name!,
      "client": review.client!,
      "date": new Date(),
      "cycle": {
        "name": cycle.name,
        "worker": cycle.worker,
        "role": cycle.role,
        "date": new Date(),
        "criterio": {
          "name": this.criterio?.name,
          "enabled": this.criterio?.enabled,
          "items": criterio.items
        }
      }
    }
  }

}
