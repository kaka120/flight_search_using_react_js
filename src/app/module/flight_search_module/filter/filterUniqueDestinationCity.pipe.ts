import { PipeTransform, Pipe } from '@angular/core';
import { distinct } from 'rxjs/operators';
@Pipe({
    name: 'filterUniqueDestinationCity',
    pure: false
  })
  export class filterUniqueDestinationCity implements PipeTransform {
  
    transform( city_list:any[], args?: any): any {
    var tmp_source = {}
    let tmp_array = []
    city_list.forEach(function(data,index,array){
       if(data['source_code']!=="")
       tmp_source["destination_code"] = data['destination_code'];  
       tmp_source["destination"] = data['destination'];
       tmp_array.push(tmp_source)
       tmp_source = {}
    })

    const removeDupliactes = (values) => {
        let concatArray = values.map(eachValue => {
          return Object.values(eachValue).join('')
        })
        let filterValues = values.filter((value, index) => {
          return concatArray.indexOf(concatArray[index]) === index
      
        })
        return filterValues
      }
    tmp_array = removeDupliactes(tmp_array);
    console.log(tmp_array)
    return tmp_array;
    }

 
    
 
  }