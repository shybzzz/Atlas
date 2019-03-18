import { AtlasApiService } from './api/atlas-api/atlas-api.service';
import { Component, OnInit } from '@angular/core';
import appSettings from '../assets/appsettings.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Atlas';

  headerConfig: { logo: string; url: string };
  messages = {};

  styles = [
    {
      featureType: 'all',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    }
  ];

  constructor(private atlasApiService: AtlasApiService) {
    this.headerConfig = appSettings.sirel;
  }

  ngOnInit() {
    this.atlasApiService.getMessages().subscribe(m => {
      this.messages = m;
    });
  }
}
