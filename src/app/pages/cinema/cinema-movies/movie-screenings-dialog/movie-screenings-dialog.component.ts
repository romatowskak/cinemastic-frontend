import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Movie } from 'src/app/shared/models/Movie';
import { MovieScreening } from '../../../../shared/models/MovieScreening';

@Component({
  selector: 'app-movie-screenings-dialog',
  templateUrl: './movie-screenings-dialog.component.html',
  styleUrls: ['./movie-screenings-dialog.component.scss'],
})
export class MovieScreeningsDialogComponent implements OnInit {
  weekDays = [
    { value: 'Monday', day: 'movie.screenings.monday' },
    { value: 'Tuesday', day: 'movie.screenings.tuesday' },
    { value: 'Wednesday', day: 'movie.screenings.wednesday' },
    { value: 'Thursday', day: 'movie.screenings.thursday' },
    { value: 'Friday', day: 'movie.screenings.friday' },
    { value: 'Saturday', day: 'movie.screenings.saturday' },
    { value: 'Sunday', day: 'movie.screenings.sunday' },
  ];

  screenings: MovieScreening[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Movie, private router: Router) {}

  ngOnInit() {}

  selectScreening(screening: MovieScreening) {
    this.router.navigate([`/cinemastic/auditorium/${screening.auditorium}/screening/${screening.id}`]);
  }

  onWeekDaySelection(day: string) {
    this.screenings = this.data.screenings.filter((screening: MovieScreening) => screening.day === day);
  }
}
