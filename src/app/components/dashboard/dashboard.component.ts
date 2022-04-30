import { Component, OnInit, ViewChild } from '@angular/core';
import { AddStockComponent } from '../../components/search-stock/search-stock.component';
import { StocksListComponent } from '../../components/stocks-list/stocks-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('addStock') addStock: AddStockComponent;
  @ViewChild('stockList') stockList: StocksListComponent;

  constructor() {}

  ngOnInit() {}
}
