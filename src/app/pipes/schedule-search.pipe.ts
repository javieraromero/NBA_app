import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheduleSearch'
})
export class ScheduleSearchPipe implements PipeTransform {

  transform(list: any, term: any, all_games: any): any {
    if(term == undefined || term == "")
    {
      return list;
    }

    return all_games.filter(function(game){
      var vTeamFull_vs_hTeamFull = game["vTeamName"] + " vs " + game["hTeamName"];
      var vTeamAbbrev_vs_hTeamAbbrev = game["vTeamtricode"] + " vs " + game["hTeamtricode"];
      var vTeamLocation_vs_hTeamLocation = game["vTeamLocation"] + " vs " + game["hTeamLocation"];
      var vTeamSimple_vs_hTeamSimple = game["vTeamSimpleName"] + " vs " + game["hTeamSimpleName"];
      var hTeamFull_vs_vTeamFull = game["hTeamName"] + " vs " + game["vTeamName"];
      var hTeamAbbrev_vs_vTeamAbbrev = game["hTeamtricode"] + " vs " + game["vTeamtricode"];
      var hTeamLocation_vs_vTeamLocation = game["hTeamLocation"] + " vs " + game["vTeamLocation"];
      var hTeamSimple_vs_vTeamSimple = game["hTeamSimpleName"] + " vs " + game["vTeamSimpleName"];
      var vTeamFull_hTeamFull = game["vTeamName"] + " " + game["hTeamName"];
      var vTeamAbbrev_hTeamAbbrev = game["vTeamtricode"] + " " + game["hTeamtricode"];
      var vTeamLocation_hTeamLocation = game["vTeamLocation"] + " " + game["hTeamLocation"];
      var vTeamSimple_hTeamSimple = game["vTeamSimpleName"] + " " + game["hTeamSimpleName"];
      var hTeamFull_vTeamFull = game["hTeamName"] + " " + game["vTeamName"];
      var hTeamAbbrev_vTeamAbbrev = game["hTeamtricode"] + " " + game["vTeamtricode"];
      var hTeamLocation_vTeamLocation = game["hTeamLocation"] + " " + game["vTeamLocation"];
      var hTeamSimple_vTeamSimple = game["hTeamSimpleName"] + " " + game["vTeamSimpleName"];

      return vTeamFull_vs_hTeamFull.toLowerCase().includes(term.toLowerCase())
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
