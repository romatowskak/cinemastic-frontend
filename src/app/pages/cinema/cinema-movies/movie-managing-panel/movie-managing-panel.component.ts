import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from 'src/app/shared/animations/fade-in.animation';

@Component({
  selector: 'app-movie-managing-panel',
  templateUrl: './movie-managing-panel.component.html',
  styleUrls: ['./movie-managing-panel.component.scss'],
  animations: [fadeInAnimation],
})
export class MovieManagingPanelComponent implements OnInit {
  isInEditMode: boolean;

  constructor(private currentRoute: ActivatedRoute) {}

  ngOnInit() {
    const { movieId } = this.currentRoute.snapshot.params;
    this.isInEditMode = !!movieId;
  }
}
