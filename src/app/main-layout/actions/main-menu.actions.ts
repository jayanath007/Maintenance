import { Action } from '@ngrx/store';
import { MainMenuItem } from '../models/main-menu-item';

export const SELECT_MENU_ITEM = 'DPS_MAIN_MENU_SELECT_MENU_ITEM';

export class SelectMenuItem implements Action {
  readonly type = SELECT_MENU_ITEM;
  constructor(public item: MainMenuItem) { }
}

export type Any = SelectMenuItem;
