import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { Flight_Search_Module } from '../app/module/flight_search_module/flight_search_module.component';
import { HttpClientModule } from '@angular/common/http';
import { NouisliderModule } from 'ng2-nouislider';
import { FlightService } from './core/services/flightService.service';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common'
import { flight_result_module } from '../app/module/flight_result_module/flight_result_module.component';
import { filterUniqueSourceCity } from '../app/module/flight_search_module/filter/filterUniqueSourceCity.pipe';
import { filterUniqueDestinationCity } from '../app/module/flight_search_module/filter/filterUniqueDestinationCity.pipe';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    Flight_Search_Module,
    flight_result_module,
    filterUniqueSourceCity,
    filterUniqueDestinationCity
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NouisliderModule,
    //MaterialModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [FlightService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
