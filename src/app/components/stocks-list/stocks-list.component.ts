import { Component, Input, OnInit } from '@angular/core';
import { SentimentDetail } from '../../models/sentiment.model';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.css'],
})
export class StocksListComponent implements OnInit {
  @Input() userStcoks: SentimentDetail[];

  constructor() {}

  ngOnInit() {}
}
