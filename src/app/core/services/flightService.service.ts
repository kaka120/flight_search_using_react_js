import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { schemaRelatedToflight } from '../schema/flightSchema';
import { DatePipe } from '@angular/common'
import { Observable } from 'rxjs';
import { throwError } from 'rxjs'


const httpOptions = {
  headers: new Headers({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class FlightService {
  flightUnion: schemaRelatedToflight[] = [];
  result_1: Array<schemaRelatedToflight[]> = [];
  result_2: schemaRelatedToflight[] = [];
  result_3: schemaRelatedToflight[] = [];
  result_4: schemaRelatedToflight[] = [];
  _Url = 'http://localhost:4200/assets/abc.json';


  constructor(private http: HttpClient) {
  
   }

 
    functionRelatedToDetails(flight_result: schemaRelatedToflight[], params1, param2): Array<schemaRelatedToflight[]> {

    this.result_1 = [];
    this.result_2 = [];
    this.result_3 = [];

    this.http.get<schemaRelatedToflight[]>(this._Url)
      .subscribe(res => {
        this.flightUnion = res;
        for (let f = 0; f < flight_result.length; f++) {
          for (let i = 0; i < this.flightUnion.length; i++) {
            let od1 = this.flightUnion[i];
            let od2 = flight_result[f];
           if (od1.source_code == od2.source_code && od1.destination_code == od2.destination_code &&  this.flightUnion[i].fare >= params1 &&  this.flightUnion[i].fare <= param2) {
            if (f === 0) {
              this.result_2.push(this.flightUnion[i]);
            } else {
              this.result_3.push(this.flightUnion[i]);
            }
          }
          }
        }
        this.result_1[0] = this.result_2;
        this.result_1[1] = this.result_3;
      });

    return this.result_1;
  }

  getCityList():Observable<schemaRelatedToflight[]>
  {
     return  this.http.get<any>(this._Url)
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
