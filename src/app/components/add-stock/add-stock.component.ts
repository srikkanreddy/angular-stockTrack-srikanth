import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StockDetail } from '../../models/stock.model';
import { StockService } from '../../services/stock.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css'],
})
export class AddStockComponent implements OnInit {
  stockName: string;
  constructor(
    private stockService: StockService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  // openModal() {
  //   const modalRef = this.modalService.open(ModalComponent);
  // }

  searchStock() {
    this.stockService
      .searchSymbol(this.stockName)
      .subscribe((resp: StockDetail[]) => {
        console.log(resp);
      });
  }

  getQuote() {
    this.stockService.getQuote(this.stockName).subscribe((res) => {
      console.log(res);
    });
  }
}
