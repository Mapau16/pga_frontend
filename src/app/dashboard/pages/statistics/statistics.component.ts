import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics.service';
import { IItemsByReview, IReviewByClient, IReviewByRole } from '../../interfaces/statistics.interface';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{

  public items: IItemsByReview[] = [];
  public clients: IReviewByClient[] = [];
  public roles: IReviewByRole[] = [];
  public legendPosition: LegendPosition = LegendPosition.Below;

  constructor(private _statisticsService: StatisticsService) { }

  animations: boolean = true;
  series: any = [
    {
      name: "Roles",
      series: [],
    },
  ];

  series2: any = [
    {
      name: "Clientes",
      series: [],
    },
  ];

  ngOnInit(): void {
    this._statisticsService.getItemsByReviews()
      .subscribe(items => this.items = items);

    this._statisticsService.getReviewsByClients()
      .subscribe(clients => {
        this.clients = clients.map((item: {client:string,count:number}) => {
          return ({
            name: item.client,
            value: item.count,
          })
        });

        this.series2[0].series = this.clients;
      });

    this._statisticsService.getReviewsByRoles()
      .subscribe(roles => {
        this.roles = roles.map((item: {role:string,count:number}) => {
          return ({
            name: item.role,
            value: item.count,
          })
        });

        this.series[0].series = this.roles;
      });
  }

}
