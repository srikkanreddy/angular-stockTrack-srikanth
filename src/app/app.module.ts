import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AddStockComponent } from './Components/add-stock/add-stock.component';
import { StocksListComponent } from './Components/stocks-list/stocks-list.component';
import { StockViewComponent } from './Components/stock-view/stock-view.component';
import { StockService } from './Services/stock.service';
import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularMaterialModule,
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    AddStockComponent,
    StocksListComponent,
    StockViewComponent,
  ],
  bootstrap: [AppComponent],
  providers: [StockService],
})
export class AppModule {}
