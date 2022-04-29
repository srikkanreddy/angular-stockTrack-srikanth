import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../services/stock.service';
import moment from 'moment';

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.css'],
})
export class StockViewComponent implements OnInit {
  symbolStock: string;
  from: string;
  to: string;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService
  ) {
    this.route.params.subscribe(
      (pramas) => (this.symbolStock = pramas['symbol'])
    );
    this.from = moment(new Date())
      .subtract(2, 'months')
      .startOf('month')
      .format('YYYY-MM-DD');
    this.to = moment(new Date()).endOf('month').format('YYYY-MM-DD');
  }

  ngOnInit() {
    console.log(this.from);
    console.log(this.to);

    this.stockService
      .getInsiderSentiment(this.symbolStock, this.from, '')
      .subscribe((resp) => {
        console.log(resp);
      });
  }
}
