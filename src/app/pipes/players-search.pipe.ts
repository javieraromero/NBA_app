import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playersSearch'
})
export class PlayersSearchPipe implements PipeTransform {

  transform(list: any, term: any): any {
    if(term == undefined || term == "")
    {
      return list;
    }

    return list.filter(function(x){

      var firstName_lastName = x["firstName"] + " " + x["lastName"];
      var lastName_firstName = x["lastName"] + " " + x["firstName"];

      var tempoaryDisplayName = x["temporaryDisplayName"] == undefined ? "" : x["temporaryDisplayName"];


      return firstName_lastName.toLowerCase().includes(term.toLowerCase())
      || lastName_firstName.toLowerCase().includes(term.toLowerCase())
      || tempoaryDisplayName.toLowerCase().includes(term.toLowerCase())
    });
  }

}