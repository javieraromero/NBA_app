import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-playoff-bracket-redirect',
  templateUrl: './playoff-bracket-redirect.component.html',
  styleUrls: ['./playoff-bracket-redirect.component.css']
})
export class PlayoffBracketRedirectComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  year: Number;

  ngOnInit() {
    this.getSeasonYear();
  }

  getSeasonYear()
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/today.json")
      .subscribe(response => {
        this.year = response["teamSitesOnly"]["seasonYear"];
        this.router.navigate(['/playoff-bracket/' + this.year]);
      });
  }
}
