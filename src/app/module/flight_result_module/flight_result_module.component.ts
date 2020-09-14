import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { schemaRelatedToflight } from '../../core/schema/flightSchema';
import { FlightService } from '../../core/services/flightService.service';


export interface combo {
  flight1: schemaRelatedToflight,
  flight2: schemaRelatedToflight
}

@Component({
  selector: 'flight_result_module',
  templateUrl: './flight_result_module.component.html',
  styleUrls: ['./flight_result_module.component.scss']
})
export class flight_result_module implements OnInit {

  @Input() result: schemaRelatedToflight;
  @Input() tripType: boolean; 
  @Input() param_1: number; 
  @Input() param_2: number; 
  toFlights: schemaRelatedToflight[] = [];
  froFlights: schemaRelatedToflight[] = [];
  result_1: combo[] = [];

 
  constructor(private _flightService: FlightService) { 
    
  }

  ngOnInit() {
      console.log( this.result)
      this.toFlights = this.result[0];
      this.froFlights = this.result[1];   
    for (let i = 0; i < this.result[0].length; i++) {
      if (JSON.stringify(this.result[1]) !== `[]`) {
        for (let j = 0; j < this.result[1].length; j++) {
          if (this.result[0][i].FareDetails + this.result[1][j].FareDetails >= this.param_1
            && this.result[0][i].FareDetails + this.result[1][j].FareDetails <= this.param_2) {
            this.result_1.push({ flight1: this.result[0][i], flight2: this.result[1][j] });
          }
        }
      } else {
        this.result_1.push({ flight1: this.result[0][i], flight2: null });
      }

    }
    
  }
}
