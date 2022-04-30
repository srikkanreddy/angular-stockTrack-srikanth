import { Component, OnDestroy, OnInit } from '@angular/core';
import { SentimentDetail } from '../../models/sentiment.model';
import { SearchResult } from '../../models/stock.model';
import { StockService } from '../../services/stock.service';
import { debounceTime } from 'rxjs/operators';
import { Observable, of, Subject, Subscription } from 'rxjs';
//import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-search-stock',
  templateUrl: './search-stock.component.html',
  styleUrls: ['./search-stock.component.css'],
})
export class AddStockComponent implements OnInit, OnDestroy {
  searchText: string;
  selectedStock: SearchResult = null;
  stockQuotesList: SentimentDetail[];
  dashboardTitle: string;
  modelChanged = new Subject<string>();
  searchResult$: Observable<SearchResult[]>;
  subscription: Subscription;

  constructor(private stockService: StockService) {
    this.getUserStocks();
  }

  changed(event) {
    this.modelChanged.next(event);
  }

  ngOnInit() {
    this.dashboardTitle =
      'Enter the symbol of a stock to track (i.e., AAPL, TSLA, GOOGL)';
    this.modelChanged.pipe(debounceTime(100)).subscribe(() => {
      if (!this.searchText || this.searchText.length > 5) {
        this.searchResult$ = of([]);
        this.selectedStock = null;
      } else {
        this.searchResult$ = this.stockService.searchSymbol(this.searchText);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUserStocks() {
    this.subscription = this.stockService.userStocksLocal$.subscribe(
      (stockQuotesList) => {
        this.stockQuotesList = stockQuotesList;
      }
    );
  }

  getStockQuotedetails() {
    let index = this.stockQuotesList.findIndex(
      (x) => x.symbol === this.selectedStock.symbol
    );
    if (index == -1) {
      this.stockService.getQuote(this.selectedStock.symbol).subscribe(
        (res: SentimentDetail) => {
          if (res) {
            res['stockName'] = this.selectedStock.description;
            res['symbol'] = this.selectedStock.symbol;
            this.saveToLocalStorage(res);
          }
        },
        (errors) => {
          window.alert(errors?.error?.error);
        }
      );
    } else {
      window.alert('Selected stock already exits in your list');
    }
  }

  saveToLocalStorage(stockQuotesListObj: SentimentDetail) {
    this.stockService.saveUserStocks(stockQuotesListObj);
    this.searchResult$ = of([]);
    this.selectedStock = null;
    this.searchText = null;
    window.alert('Stock added to your list successfully');
  }
}
