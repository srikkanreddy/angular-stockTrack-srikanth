import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../services/stock.service';
import moment from 'moment';
import { InsiderSentimentDetail } from '../../models/insiderSentiment.model';

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.css'],
})
export class StockViewComponent implements OnInit {
  symbolStock: string;
  from: string;
  to: string;
  stocksSentimentList: InsiderSentimentDetail[];
  stockName: string;
  upArrow = '\u{2B06}';
  downArrow = '\u{2B07}';

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService
  ) {
    this.route.params.subscribe((pramas) => {
      this.symbolStock = pramas['symbol'];
    });
    this.from = moment(new Date())
      .subtract(3, 'months')
      .startOf('month')
      .format('YYYY-MM-DD');
    this.to = moment(new Date())
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYY-MM-DD');
  }

  ngOnInit() {
    this.stockName = this.stockService.stockName;
    this.stockService
      .getInsiderSentiment(this.symbolStock, this.from, this.to)
      .subscribe((resp: any) => {
        if (resp?.data) {
          resp.data.forEach((stock) => {
            stock.monthName = moment(stock.month, 'MM').format('MMMM');
          });
        }
        this.stocksSentimentList = resp?.data;
        console.log(this.stocksSentimentList);
      });
  }
}
