import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../../services/client.service';
import { MatPaginator } from '@angular/material/paginator';
import { IClient } from '../../interfaces/client.interface';
import { MatDialog } from '@angular/material/dialog';
import { ClientsDialogComponent } from './clients-dialog/clients-dialog.component';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  styleUrl: './clients-page.component.css'
})
export class ClientsPageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  public displayedColumns: string[] = ['name', 'enabled', 'action'];
  public dataSource = new MatTableDataSource<IClient>;

  constructor(private _clientService: ClientService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllClients();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getAllClients() {
    this._clientService.getClients()
      .subscribe(data => {
        this._setTableDataSource(data);
    })
  }

  public searchClient(event: Event) {
    console.log((event.target as HTMLInputElement).value);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _setTableDataSource(data: IClient[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  public openDialog(client?: IClient): void {
    const dialogRef = this.dialog.open(ClientsDialogComponent, {
      data: client,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllClients();
    });
  }
}
