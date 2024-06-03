import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CriterioService } from '../../services/criterio.service';
import { MatPaginator } from '@angular/material/paginator';
import { ICriterio } from '../../interfaces/criterio.interface';
import { MatDialog } from '@angular/material/dialog';
import { CriterioDialogComponent } from './criterio-dialog/dialog/criterio-dialog.component';

@Component({
  selector: 'app-criterio-page',
  templateUrl: './criterio-page.component.html',
  styleUrl: './criterio-page.component.css'
})
export class CriterioPageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  public displayedColumns: string[] = ['name', 'enabled', 'action'];
  public dataSource = new MatTableDataSource<ICriterio>;

  constructor(private _criterioService: CriterioService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCriterios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getAllCriterios() {
    this._criterioService.getCriterios()
      .subscribe(data => {
        this._setTableDataSource(data);
    })
  }

  public searchCriterio(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _setTableDataSource(data: ICriterio[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  public openDialog(criterio?: ICriterio): void {
    const dialogRef = this.dialog.open(CriterioDialogComponent, {
      width: '750px',
      data: criterio,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllCriterios();
    });
  }
}

