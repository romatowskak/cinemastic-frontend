import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { fadeInAnimation } from './shared/animations/fade-in.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInAnimation],
})
export class AppComponent implements OnInit {
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

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.animationState;
  }
}
