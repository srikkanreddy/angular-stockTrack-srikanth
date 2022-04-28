import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../Services/api.service';

@Injectable()
export class StockService {
  constructor(private apiService: ApiService) {}

  getQuote(stockSymbol: string): Observable<any> {
    return this.apiService.get('/quote' + stockSymbol).pipe();
  }

  searchSymbol(stockSymbol: string) {
    return this.apiService.get('/symbol-search' + stockSymbol).pipe();
  }
}
