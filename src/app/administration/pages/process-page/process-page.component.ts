import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProcessService } from '../../services/process.service';
import { MatPaginator } from '@angular/material/paginator';
import { IProcess } from '../../interfaces/process.interface';
import { MatDialog } from '@angular/material/dialog';
import { ProcessDialogComponent } from './process-dialog/process-dialog.component';

@Component({
  selector: 'app-process-page',
  templateUrl: './process-page.component.html',
  styleUrl: './process-page.component.css'
})
export class ProcessPageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  public displayedColumns: string[] = ['name', 'enabled', 'action'];
  public dataSource = new MatTableDataSource<IProcess>;

  constructor(private _processService: ProcessService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllProcess();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getAllProcess() {
    this._processService.getProcess()
      .subscribe(data => {
        this._setTableDataSource(data);
    })
  }

  public searchProcess(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _setTableDataSource(data: IProcess[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  public openDialog(process?: IProcess): void {
    const dialogRef = this.dialog.open(ProcessDialogComponent, {
      data: process,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllProcess();
    });
  }
}
