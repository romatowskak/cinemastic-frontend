import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from 'src/app/shared/animations/fade-in.animation';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  animations: [fadeInAnimation],
})
export class MoviesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
