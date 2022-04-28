import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { StocksListComponent } from './components/stocks-list/stocks-list.component';
import { StockViewComponent } from './components/stock-view/stock-view.component';
import { StockService } from './services/stock.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ApiService } from './services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    NgbModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    AddStockComponent,
    StocksListComponent,
    StockViewComponent,
    ModalComponent,
  ],
  bootstrap: [AppComponent],
  providers: [StockService, ApiService],
})
export class AppModule {}
