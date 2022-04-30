import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../services/stock.service';
import moment from 'moment';
import { InsiderSentimentDetail } from '../../models/insiderSentiment.model';
import { Icons } from '../../models/icons.model';

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.css'],
})
export class StockViewComponent implements OnInit {
  stockSymbol: string;
  from: string;
  to: string;
  stocksSentimentList: InsiderSentimentDetail[];
  stockName: string;
  icons: Icons;
  showLoader: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService
  ) {
    this.route.params.subscribe((pramas) => {
      this.stockSymbol = pramas['symbol'];
    });
    this.from = moment(new Date())
      .subtract(3, 'months')
      .startOf('month')
      .format('YYYY-MM-DD');
    this.to = moment(new Date())
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYY-MM-DD');
    this.icons = this.stockService.icons;
  }

  ngOnInit() {
    this.showLoader = true;
    this.stockName = this.stockService.stockName;
    this.stockService
      .getInsiderSentiment(this.stockSymbol, this.from, this.to)
      .subscribe(
        (resp: InsiderSentimentDetail[]) => {
          if (resp) {
            resp.forEach((stock) => {
              stock.monthName = moment(stock.month, 'MM').format('MMMM');
            });
            this.stocksSentimentList = resp;
            this.showLoader = false;
          } else {
            this.showLoader = false;
          }
        },
        (errors) => {
          this.showLoader = false;
        }
      );
  }
}
