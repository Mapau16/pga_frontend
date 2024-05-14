import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GuidelineService } from '../../services/guideline.service';
import { MatPaginator } from '@angular/material/paginator';
import { IGuideline } from '../../interfaces/guideline.interface';
import { MatDialog } from '@angular/material/dialog';
import { GuidelinesDialogComponent } from './guidelines-dialog/guidelines-dialog.component';

@Component({
  selector: 'app-guidelines-page',
  templateUrl: './guidelines-page.component.html',
  styleUrl: './guidelines-page.component.css'
})
export class GuidelinesPageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  public displayedColumns: string[] = ['name', 'enabled', 'action'];
  public dataSource = new MatTableDataSource<IGuideline>;

  constructor(private _guidelineService: GuidelineService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllGuidelines();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getAllGuidelines() {
    this._guidelineService.getGuidelines()
      .subscribe(data => {
        this._setTableDataSource(data);
    })
  }

  public searchGuideline(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _setTableDataSource(data: IGuideline[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  public openDialog(guideline?: IGuideline): void {
    const dialogRef = this.dialog.open(GuidelinesDialogComponent, {
      data: guideline,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllGuidelines();
    });
  }
}
