import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReviewService } from '../../services/review.service';
import { MatPaginator } from '@angular/material/paginator';
import { IReview } from '../../interfaces/review.interface';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrl: './review-page.component.css'
})
export class ReviewPageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  public displayedColumns: string[] = ['name', 'enabled', 'action'];
  public dataSource = new MatTableDataSource<IReview>;

  constructor(private _reviewService: ReviewService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllReview();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getAllReview() {
    this._reviewService.getReview()
      .subscribe(data => {
        this._setTableDataSource(data);
    })
  }

  public searchReview(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _setTableDataSource(data: IReview[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }
}
