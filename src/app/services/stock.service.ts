import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { InsiderSentimentDetail } from '../models/insiderSentiment.model';
import { SentimentDetail } from '../models/sentiment.model';
import { StockDetail } from '../models/stock.model';
import { ApiService } from '../services/api.service';

@Injectable()
export class StockService {
  readonly token = 'bu4f8kn48v6uehqi3cqg';
  stockName: string;
  constructor(private apiService: ApiService) {}

  getUserStocks() {
    return JSON.parse(localStorage.getItem('userStocks')) || [];
  }

  saveUserStocks(stockObj) {
    let stockQuotesList = this.getUserStocks();
    stockQuotesList.push(stockObj);
    stockQuotesList = stockQuotesList.reverse();
    localStorage.setItem('userStocks', JSON.stringify(stockQuotesList));
  }

  deleteStock(stockObj) {
    let userStocksTemp = this.getUserStocks();
    userStocksTemp = userStocksTemp.filter(
      (data) => data.symbol != stockObj.symbol
    );
    localStorage.setItem('userStocks', JSON.stringify(userStocksTemp));
  }

  getQuote(stockSymbol: string): Observable<SentimentDetail> {
    return this.apiService.get(
      `/quote?symbol=${stockSymbol}&token=${this.token}`
    );
  }

  searchSymbol(stockSymbol: string): Observable<StockDetail[]> {
    return this.apiService.get(`/search?q=${stockSymbol}&token=${this.token}`);
  }

  getInsiderSentiment(
    stockSymbol: string,
    from: string,
    to: string
  ): Observable<InsiderSentimentDetail> {
    return this.apiService.get(
      `/stock/insider-sentiment?symbol=${stockSymbol}&from=${from}&to=${to}&token=${this.token}`
    );
  }
}
