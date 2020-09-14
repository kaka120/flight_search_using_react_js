import { Component, Input, OnInit } from '@angular/core';
import { schemaRelatedToflight } from '../../core/schema/flightSchema';
import { FlightService } from '../../core/services/flightService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NavbarModule, WavesModule } from 'angular-bootstrap-md'

@Component({
  selector: 'flight_search_module',
  templateUrl: './flight_search_module.component.html',
  styleUrls: ['./flight_search_module.component.scss']
})
export class Flight_Search_Module implements OnInit {
  flight: schemaRelatedToflight;
  flightInput: schemaRelatedToflight[] = [];
  custom_range: Array<any> = [];
  displayRetField: boolean = false;
  public city_list : any[] = []
  

  flightArr: Array<schemaRelatedToflight[]> = [];

  constructor(private _flightService: FlightService) { 
          
    this.flight = {
      flight_id: "",
      source: "",
      source_code: "",
      destination: "",
      destination_code: "",
      fare:  null,
      departs_at: "",
      arrives_at: "",
      SeatsAvailable:null
    };
  }
  ngOnInit() {
    
    this._flightService.getCityList().subscribe(res=>{
      this.city_list = res;
    })
    

    this.custom_range = [1000, 10000];
    this.flight = {
     flight_id: "",
     source: "",
     source_code: "",
     destination: "",
     destination_code: "",
     fare:  null,
     departs_at: "",
     arrives_at: "",
     SeatsAvailable:null
    };
  }
  searchFlights(vals) {
    if (this.displayRetField != true) {
      this.flightInput = [
        {
         flight_id: "",
         source: vals.originCity,
         source_code: vals.originCity,
         destination: "",
         destination_code: vals.destCity,
         fare: null,
         departs_at: "",
         arrives_at: "",
         SeatsAvailable:vals.passCount
        }
      ]
    }
    this.flightArr = this._flightService.functionRelatedToDetails(this.flightInput, this.custom_range[0], this.custom_range[1]);
  }
  retDt = new FormControl('', [Validators.required]);
  getErrorMessage() {
    return this.retDt.hasError('required') ? 'You must enter a value' :
      this.retDt.hasError('retDt') ? 'Not a valid email' :
        '';
  }
  noResults() {
    if ((this.flightArr.length == 0) || (this.displayRetField === false && this.flightArr[0].length == 0) || (this.displayRetField === true && this.flightArr[1].length == 0)) {
      return true;
    }
  }
  onChange($event) {
    this.flightArr = this._flightService.functionRelatedToDetails(this.flightInput, this.custom_range[0], this.custom_range[1]);
  }
}
