import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SentimentDetail } from '../../models/sentiment.model';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css'],
})
export class StocksListComponent implements OnInit {
  @Input() userStcoks: SentimentDetail[];

  constructor(private stockService: StockService, private router: Router) {}

  ngOnInit() {}

  redirectToStockSentiment(stockName, symbol) {
    this.stockService.stockName = stockName;
    this.router.navigate(['/sentiment', symbol]);
  }
}
