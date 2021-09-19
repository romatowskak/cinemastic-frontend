import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from 'src/app/shared/models/Movie';

@Component({
  selector: 'app-movie-trailer-dialog',
  templateUrl: './movie-trailer-dialog.component.html',
  styleUrls: ['./movie-trailer-dialog.component.scss'],
})
export class MovieTrailerDialogComponent implements OnInit {
  trailer: SafeResourceUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Movie, private domSanitizer: DomSanitizer) {}

  ngOnInit() {
    this.trailer = this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.trailer);
  }
}
