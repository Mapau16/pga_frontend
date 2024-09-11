import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from '../../../services/review.service';
import { ClientService } from '../../../services/client.service';
import { RoleService } from '../../../services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrl: './review-dialog.component.css'
})
export class ReviewDialogComponent {

  public idreview: string = ''; 
  public clients: any[] = [];
  public roles: any[] = [];
  public items: any[] = [];
  public reviewDialogForm: FormGroup = this._fb.nonNullable.group({
    name: ['', Validators.required],
    client: ['', Validators.required],
    cycle: this._fb.group({
      name: ['', Validators.required],
      worker: ['', Validators.required],
      role: ['', Validators.required],
    })
  });

  constructor(public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private _fb: FormBuilder,
    private _reviewService: ReviewService,
    private _clientService: ClientService,
    private _roleService: RoleService,) { }

  ngOnInit(): void {

    this._clientService.getClients()
    .subscribe(clients => this.clients = clients);

  this._roleService.getRoles()
    .subscribe(roles => this.roles = roles);


    if (this.data) {
      this.idreview = this.data;
      this._reviewService.searchReviewById(this.idreview)
        .subscribe({
          next: (res) => {
            this.items = res.cycle.criterio.items;
            this.reviewDialogForm.reset({
              name: res.name,
              client: res.client,
              cycle: {
                name: res.cycle.name,
                worker: res.cycle.worker,
                role: res.cycle.role,
              }
            });
          }
        });
    }
  }

  public onSubmitForm() {
    const data = this.reviewDialogForm.value;
    this._reviewService.updateReview(this.idreview, data)
    .subscribe({
      next: (() => this.onClose()),
      error: (error => Swal.fire('Error', error, 'error'))
    })
  }
    
  onClose(): void {
    this.dialogRef.close();
  }
}
