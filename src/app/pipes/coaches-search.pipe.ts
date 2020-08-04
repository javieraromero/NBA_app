import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coachesSearch'
})
export class CoachesSearchPipe implements PipeTransform {

  transform(list: any, term: any): any {
    if(term == undefined || term == "")
    {
      return list;
    }

    return list.filter(function(x){

      var firstName_lastName = x["firstName"] + " " + x["lastName"];
      var lastName_firstName = x["lastName"] + " " + x["firstName"];

      return firstName_lastName.toLowerCase().includes(term.toLowerCase())
      || lastName_firstName.toLowerCase().includes(term.toLowerCase());
    });
  }

}