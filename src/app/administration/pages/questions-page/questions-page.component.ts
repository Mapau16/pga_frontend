import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { QuestionService } from '../../services/question.service';
import { MatPaginator } from '@angular/material/paginator';
import { IQuestion } from '../../interfaces/question.interface';
import { MatDialog } from '@angular/material/dialog';
import { QuestionsDialogComponent } from './questions-dialog/questions-dialog.component';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrl: './questions-page.component.css'
})
export class QuestionsPageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};
  public displayedColumns: string[] = ['name', 'enabled', 'action'];
  public dataSource = new MatTableDataSource<IQuestion>;

  constructor(private _questionService: QuestionService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public getAllQuestions() {
    this._questionService.getQuestions()
      .subscribe(data => {
        this._setTableDataSource(data);
    })
  }

  public searchQuestion(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _setTableDataSource(data: IQuestion[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  public openDialog(question?: IQuestion): void {
    const dialogRef = this.dialog.open(QuestionsDialogComponent, {
      data: question,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllQuestions();
    });
  }
}
