import { Component } from '@angular/core';
import { SvgIconService } from './shared';

@Component({
  selector: 'dps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private iconService: SvgIconService) {
    this.iconService.registerIcons();
  }
}
