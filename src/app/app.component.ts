import { AtlasApiService } from './api/atlas-api/atlas-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Atlas';

  headerConfig: { logo: string; url: string };
  messages = {};
  styles;

  constructor(private atlasApiService: AtlasApiService) {}

  ngOnInit() {
    this.atlasApiService.getMessages().subscribe(m => {
      this.messages = m;
    });

    this.atlasApiService.getAppSettings().subscribe(appSettings => {
      this.headerConfig = appSettings.headerConfig;
      this.styles = appSettings.googleMapStyles;
    });
  }
}
