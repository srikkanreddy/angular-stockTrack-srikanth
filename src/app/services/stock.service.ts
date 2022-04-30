import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Icons } from '../models/icons.model';
import { InsiderSentimentDetail } from '../models/insiderSentiment.model';
import { SentimentDetail } from '../models/sentiment.model';
import { SearchResult } from '../models/stock.model';
import { ApiService } from '../services/api.service';

@Injectable()
export class StockService {
  private readonly token = 'bu4f8kn48v6uehqi3cqg';
  readonly icons: Icons = {
    downArrow: '\u{21E9}',
    upArrow: '\u{21E7}',
  };
  stockName: string;
  userStocksLocal$: BehaviorSubject<SentimentDetail[]> = new BehaviorSubject<
    SentimentDetail[]
  >([]);

  showLoader: boolean = false;
  constructor(private apiService: ApiService) {
    this.getUserStocks();
  }

  private userStocksLocal() {
    return JSON.parse(localStorage.getItem('userStocks')) || [];
  }

  getUserStocks(): void {
    this.userStocksLocal$.next(this.userStocksLocal());
  }

  saveUserStocks(stockObj): void {
    let stockQuotesList = this.userStocksLocal();
    stockQuotesList.unshift(stockObj);
    localStorage.setItem('userStocks', JSON.stringify(stockQuotesList));
    this.getUserStocks();
  }

  deleteStock(stockObj): void {
    let userStocksTemp = this.userStocksLocal();
    userStocksTemp = userStocksTemp.filter(
      (data) => data.symbol != stockObj.symbol
    );
    localStorage.setItem('userStocks', JSON.stringify(userStocksTemp));
    this.getUserStocks();
  }

  getQuote(stockSymbol: string): Observable<SentimentDetail> {
    return this.apiService.get(
      `/quote?symbol=${stockSymbol}&token=${this.token}`
    );
  }

  searchSymbol(stockSymbol: string): Observable<SearchResult[]> {
    return this.apiService
      .get(`/search?q=${stockSymbol}&token=${this.token}`)
      .pipe(map((data) => data.result));
  }

  getInsiderSentiment(
    stockSymbol: string,
    from: string,
    to: string
  ): Observable<InsiderSentimentDetail[]> {
    return this.apiService
      .get(
        `/stock/insider-sentiment?symbol=${stockSymbol}&from=${from}&to=${to}&token=${this.token}`
      )
      .pipe(map((res) => res.data));
  }
}
