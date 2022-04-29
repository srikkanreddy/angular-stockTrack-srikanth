import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StockService } from '../../services/stock.service';
import * as moment from 'moment';

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
    console.log('last month first date');
    const lastmonthlastdate = moment()
      .subtract(1, 'months')
      .startOf('month')
      .format('DD-MM-YYYY');
    console.log(lastmonthlastdate);

    console.log('lastmonth last date');
    const lastmonthfirstdate = moment()
      .subtract(1, 'months')
      .endOf('month')
      .format('DD-MM-YYYY');
    console.log(lastmonthfirstdate);
    // this.stockService
    //   .getInsiderSentiment(this.symbolStock, new Date().toString(), '')
    //   .subscribe((resp) => {
    //     console.log(resp);
    //   });
  }

  ngOnInit() {}
}
