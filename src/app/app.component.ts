import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cinema-app';

  constructor(private translate: TranslateService, private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    const icons = [
      {
        name: 'rating_star',
        url: 'assets/icons/rating-star.svg',
      },
      {
        name: 'clock',
        url: 'assets/icons/clock.svg',
      },
      {
        name: 'calendar',
        url: 'assets/icons/calendar.svg',
      },
      {
        name: 'movie_ticket',
        url: 'assets/icons/ticket.svg',
      },
      {
        name: 'play_button',
        url: 'assets/icons/play-button.svg',
      },
      {
        name: 'folder',
        url: 'assets/icons/folder.svg',
      },
    ];

    icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(icon.name, this.sanitizer.bypassSecurityTrustResourceUrl(icon.url));
    });
  }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
