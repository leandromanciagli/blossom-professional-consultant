import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { reducers } from '@store/app.reducer'
import { metaReducers } from './store/meta-reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, 
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      }),
    ),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
    ),
    provideClientHydration(withEventReplay()),
    provideStore(reducers, { metaReducers }),
  ]
};
