import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icons } from '../../models/icons.model';
import { SentimentDetail } from '../../models/sentiment.model';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css'],
})
export class StocksListComponent implements OnInit {
  stockQuotesList: SentimentDetail[];
  icons: Icons;

  constructor(private stockService: StockService, private router: Router) {
    this.icons = this.stockService.icons;
  }

  ngOnInit() {
    this.getUserStocks();
  }

  getUserStocks() {
    this.stockService.userStocksLocal$.subscribe(
      (stockQuotesList: SentimentDetail[]) => {
        this.stockQuotesList = stockQuotesList;
        // console.log(this.stockQuotesList);
      }
    );
  }

  redirectToStockSentiment(stockName: string, symbol: string) {
    this.stockService.stockName = stockName;
    this.router.navigate(['/sentiment', symbol]);
  }

  removeStock(stock: SentimentDetail) {
    this.stockService.deleteStock(stock);
    window.alert('Stock removed from your list successfully');
  }
}
