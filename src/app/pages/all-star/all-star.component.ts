import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-star',
  templateUrl: './all-star.component.html',
  styleUrls: ['./all-star.component.css']
})
export class AllStarComponent implements OnInit {

  year;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.year = this.route.snapshot.paramMap.get('year');
    this.getData(this.year);
  }

  getData(year: String)
  {
    return this.http.get("http://data.nba.net/10s/prod/v1/allstar/" + year + "/AS_roster.json")
      .subscribe(response => {
        console.log(response["sportsContent"]);
      });
  }
}
