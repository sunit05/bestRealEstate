import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';   // 👈 import config

bootstrapApplication(AppComponent, appConfig)   // 👈 pass config here
  .catch(err => console.error(err));
