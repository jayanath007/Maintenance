import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'dps-tickets-layout',
  templateUrl: './tickets-layout.component.html',
  styleUrls: ['./tickets-layout.component.scss']
})
export class TicketsLayoutComponent implements OnInit {

  openMode: MatDrawerMode = 'side';

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.Tablet,
    ]).subscribe(result => {
      if (result.matches) {
        this.openMode = 'over';
      } else {
        this.openMode = 'side';
      }
    });
  }
}
