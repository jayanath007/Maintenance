import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { MatDrawerMode } from '@angular/material/sidenav';

import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {
  onSideNavChange,
  onMainContentChange,
  animateText
} from './animations/sidenav.animations';

import { SvgIcons } from '../shared';
import { AuthenticationService, AuthUser } from '../auth';
import { MainMenuItem } from './models/main-menu-item';
import { getMainMenuItems } from './reducers';
import { SelectMenuItem } from './actions/main-menu.actions';
import { getSelectedDomain, getDomains, ChangeSelectedDomain, LocalStorageKeys, GetClientDomains } from '../core';
import { SetInitDomain } from '../core/actions/core.actions';

@Component({
  selector: 'dps-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [onSideNavChange, onMainContentChange, animateText]
})
export class MainLayoutComponent implements OnInit {
  openMode: MatDrawerMode = 'side';
  isSmallSideNav = false;
  isSmallScreen = false;
  linkText = false;

  authUser$: Observable<AuthUser> = of(null);
  mainMenuItems$: Observable<MainMenuItem[]> = of([]);
  selectedDomain$: Observable<string> = of('');
  domains$: Observable<string[]> = of([]);

  SvgIcons = SvgIcons;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authenticationService: AuthenticationService,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.WebLandscape])
      .subscribe(result => {
        if (result.matches) {
          this.isSmallScreen = false;
          this.openMode = 'side';
          this.isSmallSideNav = false;
        } else {
          this.isSmallScreen = true;
          this.openMode = 'side';
          this.isSmallSideNav = true;
        }
        setTimeout(() => {
          this.linkText = this.isSmallSideNav;
        }, 200);
      });
    this.mainMenuItems$ = this.store.select(getMainMenuItems);
    this.mainMenuItems$.pipe(first()).subscribe(menues => {
      this.store.dispatch(new SelectMenuItem(menues.find(val => this.router.isActive(val.routerLink, true))));
    });
    this.authUser$ = this.authenticationService.currentUser;
    this.selectedDomain$ = this.store.select(getSelectedDomain);
    this.domains$ = this.store.select(getDomains);
    this.authUser$.pipe(first()).subscribe(user => {
      const selectedDomain = localStorage.getItem(LocalStorageKeys.SelectedDomin);
      if (user.isUser || !selectedDomain) {
        this.store.dispatch(new SetInitDomain(user.domainAllowed));
      } else {
        this.store.dispatch(new SetInitDomain(selectedDomain));
      }
      if (!user.isUser) {
        this.store.dispatch(new GetClientDomains());
      }
    });
  }

  onToggleSideNav() {
    if (this.isSmallScreen && this.isSmallSideNav) {
      this.openMode = 'over';
    } else {
      this.openMode = 'side';
    }

    setTimeout(() => {
      this.isSmallSideNav = !this.isSmallSideNav;
      setTimeout(() => {
        this.linkText = this.isSmallSideNav;
      }, 200);
    }, 10);
  }

  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  onMenueItemClick(menue: MainMenuItem) {
    if (!this.isSmallSideNav && this.isSmallScreen) {
      this.onToggleSideNav();
    }
    this.store.dispatch(new SelectMenuItem(menue));
  }
  onDomainChange(domain: string, selectedDomain: string) {
    if (domain !== selectedDomain) {
      this.store.dispatch(new ChangeSelectedDomain(domain));
    }
  }
  onDomainsSearchClick(event: KeyboardEvent | MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
  onDomainsSearchKeydown(domainsSearch: HTMLInputElement, event?: KeyboardEvent) {
    if (!event || (event.key !== 'ArrowDown' && event.key !== 'ArrowUp')) {
      setTimeout(() => {
        domainsSearch.focus();
        document.getElementsByClassName('dps-domain-list-menue')[0].scrollTo({ top: 0 });
      }, 500);
    }
  }
  filterDomains(domains: string[], search: string) {
    return domains ? domains.filter(val => val.includes(search)) : [];
  }
}
