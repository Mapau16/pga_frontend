import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from '../../services/role.service';
import { MatPaginator } from '@angular/material/paginator';
import { IRole } from '../../interfaces/role.interface';
import { MatDialog } from '@angular/material/dialog';
import { RolesDialogComponent } from './roles-dialog/roles-dialog.component';

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrl: './roles-page.component.css'
})
export class RolesPageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  public displayedColumns: string[] = ['name', 'enabled', 'action'];
  public dataSource = new MatTableDataSource<IRole>;

  constructor(private _roleService: RoleService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllRoles();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getAllRoles() {
    this._roleService.getRoles()
      .subscribe(data => {
        this._setTableDataSource(data);
    })
  }

  public searchRole(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _setTableDataSource(data: IRole[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  public openDialog(role?: IRole): void {
    const dialogRef = this.dialog.open(RolesDialogComponent, {
      data: role,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllRoles();
    });
  }
}

