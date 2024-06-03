import { Component, Input, OnInit, effect } from '@angular/core';
import { ICriterioItems } from '../../../../interfaces/criterio.interface';
import { MatTableDataSource } from '@angular/material/table';
import { CriterioService } from '../../../../services/criterio.service';

@Component({
  selector: 'criterio-dialog-table',
  templateUrl: './criterio-dialog-table.component.html',
  styleUrl: './criterio-dialog-table.component.css'
})
export class CriterioDialogTableComponent implements OnInit {

  @Input() idCriterio: string = '';
  public dataSource = new MatTableDataSource<ICriterioItems>;
  public displayedColumns: string[] = ['guideline', 'process', 'question', 'action'];

  constructor(private _criterioService: CriterioService,) {
    effect(() => {
      console.log(this._criterioService.criterioItems());
      this.dataSource = new MatTableDataSource(this._criterioService.criterioItems());
    });
  }

  ngOnInit(): void {
    this._getCriterioById(this.idCriterio);
  }

  private _getCriterioById(idcriterio: string) {
    this._criterioService.getCriterioById(idcriterio)
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res.items);
        this._setCriterioItems(res.items ? res.items : []);
      })
  }

  public removeCriterio(index: number) {
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = this.dataSource.data;
    this._setCriterioItems(this.dataSource.data)
  }

  private _setCriterioItems(data: ICriterioItems[]) {
    this._criterioService.criterioItems.set(data);
  }

}
