import { Component, Input, OnInit } from '@angular/core';
import { QuoteDetail } from '../../models/quote.model';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css']
})
export class StocksListComponent implements OnInit {
  @Input() userStcoks:QuoteDetail [];

  constructor() { }

  ngOnInit() {
  }
  goToSentiment(){

  }

}