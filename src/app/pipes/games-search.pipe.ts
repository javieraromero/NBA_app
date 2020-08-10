import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gamesSearch'
})
export class GamesSearchPipe implements PipeTransform {

  transform(list: any, term: any): any {
    if(term == undefined || term == "")
    {
      return list;
    }

    return list.filter(function(x){

      var long_date = x["longDate"];
      var vTeamFull_vs_hTeamFull = x["vTeamName"] + " vs " + x["hTeamName"];
      var vTeamAbbrev_vs_hTeamAbbrev = x["vTeamTricode"] + " vs " + x["hTeamTricode"];
      var vTeamLocation_vs_hTeamLocation = x["vTeamLocation"] + " vs " + x["hTeamLocation"];
      var vTeamSimple_vs_hTeamSimple = x["vTeamSimpleName"] + " vs " + x["hTeamSimpleName"];
      var hTeamFull_vs_vTeamFull = x["hTeamName"] + " vs " + x["vTeamName"];
      var hTeamAbbrev_vs_vTeamAbbrev = x["hTeamTricode"] + " vs " + x["vTeamTricode"];
      var hTeamLocation_vs_vTeamLocation = x["hTeamLocation"] + " vs " + x["vTeamLocation"];
      var hTeamSimple_vs_vTeamSimple = x["hTeamSimpleName"] + " vs " + x["vTeamSimpleName"];
      var vTeamFull_hTeamFull = x["vTeamName"] + " " + x["hTeamName"];
      var vTeamAbbrev_hTeamAbbrev = x["vTeamTricode"] + " " + x["hTeamTricode"];
      var vTeamLocation_hTeamLocation = x["vTeamLocation"] + " " + x["hTeamLocation"];
      var vTeamSimple_hTeamSimple = x["vTeamSimpleName"] + " " + x["hTeamSimpleName"];
      var hTeamFull_vTeamFull = x["hTeamName"] + " " + x["vTeamName"];
      var hTeamAbbrev_vTeamAbbrev = x["hTeamTricode"] + " " + x["vTeamTricode"];
      var hTeamLocation_vTeamLocation = x["hTeamLocation"] + " " + x["vTeamLocation"];
      var hTeamSimple_vTeamSimple = x["hTeamSimpleName"] + " " + x["vTeamSimpleName"];

      return long_date.toLowerCase().includes(term.toLowerCase())
      || vTeamFull_vs_hTeamFull.toLowerCase().includes(term.toLowerCase())
      || vTeamAbbrev_vs_hTeamAbbrev.toLowerCase().includes(term.toLowerCase())
      || vTeamLocation_vs_hTeamLocation.toLowerCase().includes(term.toLowerCase())
      || vTeamSimple_vs_hTeamSimple.toLowerCase().includes(term.toLowerCase())
      || hTeamFull_vs_vTeamFull.toLowerCase().includes(term.toLowerCase())
      || hTeamAbbrev_vs_vTeamAbbrev.toLowerCase().includes(term.toLowerCase())
      || hTeamLocation_vs_vTeamLocation.toLowerCase().includes(term.toLowerCase())
      || hTeamSimple_vs_vTeamSimple.toLowerCase().includes(term.toLowerCase())
      || vTeamFull_hTeamFull.toLowerCase().includes(term.toLowerCase())
      || vTeamAbbrev_hTeamAbbrev.toLowerCase().includes(term.toLowerCase())
      || vTeamLocation_hTeamLocation.toLowerCase().includes(term.toLowerCase())
      || vTeamSimple_hTeamSimple.toLowerCase().includes(term.toLowerCase())
      || hTeamFull_vTeamFull.toLowerCase().includes(term.toLowerCase())
      || hTeamAbbrev_vTeamAbbrev.toLowerCase().includes(term.toLowerCase())
      || hTeamLocation_vTeamLocation.toLowerCase().includes(term.toLowerCase())
      || hTeamSimple_vTeamSimple.toLowerCase().includes(term.toLowerCase());

    });
  }

}