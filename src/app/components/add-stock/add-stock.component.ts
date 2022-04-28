import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StockDetail } from '../../models/stock.model';
import { StockService } from '../../services/stock.service';
//import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css'],
})
export class AddStockComponent implements OnInit {
  stockName: any;
  stocksSearchList: StockDetail[];
  showSearchList: boolean;
  selectedStock: any;

  constructor(private stockService: StockService) {}

  ngOnInit() {}

  // openModal() {
  //   const modalRef = this.modalService.open(ModalComponent);
  // }

  searchStock() {
    this.stockService.searchSymbol(this.stockName).subscribe((resp: any) => {
      this.showSearchList = true;
      this.stocksSearchList = resp?.result;
      console.log(resp);
    });
  }

  getQuote() {
    this.stockService.getQuote(this.stockName).subscribe((res) => {
      console.log(res);
    });
  }

  addStockToList() {
    var stocksList = [];
    stocksList = JSON.parse(localStorage.getItem('userStocks')) || [];

    stocksList.push(this.selectedStock);
    localStorage.setItem('userStocks', JSON.stringify(stocksList));

    console.log(localStorage);
  }

  selectStock(stock) {
    // this.showSearchList = false;
    this.selectedStock = stock;
  }
}
