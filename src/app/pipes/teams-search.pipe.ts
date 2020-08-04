import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'teamsSearch'
})
export class TeamsSearchPipe implements PipeTransform {

  transform(list: any, term: any): any {
    if(term == undefined || term == "")
    {
      return list;
    }

    return list.filter(function(x){

      var location = x["location"] == undefined ? "" : x["location"];
      var altCityName = x["altCityName"] == undefined ? "" : x["altCityName"];
      var teamName = x["teamName"] == undefined ? "" : x["teamName"];
      var tricode = x["tricode"] == undefined ? "" : x["tricode"];
      var simpleName = x["simpleName"] == undefined ? "" : x["simpleName"];
      var teamShortName = x["teamShortName"] == undefined ? "" : x["teamShortName"];

      return location.toLowerCase().includes(term.toLowerCase())
      || altCityName.toLowerCase().includes(term.toLowerCase())
      || teamName.toLowerCase().includes(term.toLowerCase())
      || tricode.toLowerCase().includes(term.toLowerCase())
      || simpleName.toLowerCase().includes(term.toLowerCase())
      || teamShortName.toLowerCase().includes(term.toLowerCase());
    });
  }

}