import { Component, OnInit } from '@angular/core';
import { SentimentDetail } from '../../models/sentiment.model';
import { StockDetail } from '../../models/stock.model';
import { StockService } from '../../services/stock.service';
import { debounceTime } from 'rxjs/operators';
//import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css'],
})
export class AddStockComponent implements OnInit {
  stockName: string;
  stocksSearchList: StockDetail[];
  selectedStock: StockDetail = null;
  stocksList: SentimentDetail[];
  stockQuotesListObj: SentimentDetail;
  stockQuotesListArr: SentimentDetail[];

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.stockQuotesListArr =
      JSON.parse(localStorage.getItem('userStocks')) || [];
  }

  searchStock() {
    if (this.stockName && this.stockName != '') {
      this.stockService.searchSymbol(this.stockName).subscribe((resp: any) => {
        if (this.stockName) {
          this.stocksSearchList = resp?.result;
        }
      });
    } else {
      this.stocksSearchList = [];
      this.selectedStock = null;
    }
  }

  getStockQuotedetails() {
    this.stockService
      .getQuote(this.selectedStock.symbol)
      .subscribe((res: SentimentDetail) => {
        this.stockQuotesListObj = res;
        this.stockQuotesListObj['stockName'] = this.selectedStock.description;
        this.stockQuotesListObj['symbol'] = this.selectedStock.symbol;
        this.saveToLocalStorage();
      });
  }

  saveToLocalStorage() {
    let stockQuotesListArrTemp =
      JSON.parse(localStorage.getItem('userStocks')) || [];
    stockQuotesListArrTemp.push(this.stockQuotesListObj);
    stockQuotesListArrTemp = stockQuotesListArrTemp.reverse();
    localStorage.setItem('userStocks', JSON.stringify(stockQuotesListArrTemp));
    this.stockQuotesListArr =
      JSON.parse(localStorage.getItem('userStocks')) || [];
    this.stocksSearchList = [];
    this.selectedStock = null;
  }
}
