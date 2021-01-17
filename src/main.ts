
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DatePipe } from '@angular/common';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppConfig } from './app/app.config';

declare global {
  interface Date {
    toDpsString: () => string;
  }
  interface Array<T> {
    sum: (prop?: string) => number;
  }
}

Date.prototype.toDpsString = function() {
  const datePipe = new DatePipe('en-US');
  return datePipe.transform(this, 'yyyy-MM-ddTHH:mm:ss');
};

Array.prototype.sum = function(prop?: string) {
  let total = 0;
  if (prop) {
    for (let i = 0, _len = this.length; i < _len; i++) {
      total += this[i][prop];
    }
  } else {
    for (let i = 0, _len = this.length; i < _len; i++) {
      total += this[i];
    }
  }
  return total;
};

if (environment.production) {
  enableProdMode();
}

function loadAjax(url, error, success) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === XMLHttpRequest.DONE) {
      if (xmlhttp.status === 200) {
        success(xmlhttp.responseText);
      } else if (xmlhttp.status === 400) {
        error();
      } else {
        error();
      }
    }
  };

  xmlhttp.open('GET', url, true);
  xmlhttp.send();
}

function bootstrapApp(providers) {
  platformBrowserDynamic(providers)
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

loadAjax(
  environment.config,
  () => alert('error loading' + environment.config),
  configResult => {
    try {
      const config = JSON.parse(configResult);
      const providers = [
        { provide: AppConfig, useValue: new AppConfig(config) }
      ];
      bootstrapApp(providers);
    } catch (e) {
      alert(e);
    }
  }
);
