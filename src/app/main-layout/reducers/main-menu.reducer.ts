import { MainMenuItem } from '../models/main-menu-item';
import * as Actions from '../actions/main-menu.actions';
import { SvgIcons } from '../../shared';

export interface State {
  readonly menuItems: MainMenuItem[];
}

const mainMenuItems: MainMenuItem[] = [
  {
    id: 'tickets',
    lable: 'Tickets',
    svgIcon: SvgIcons.IconTicket,
    routerLink: '/main/tickets'
  },
  {
    id: 'clients',
    lable: 'Clients',
    svgIcon: SvgIcons.IconGroup,
    routerLink: '/main/clients',
    disabled: true
  },
  {
    id: 'contacts',
    lable: 'Contacts',
    svgIcon: SvgIcons.IconAddressbook,
    routerLink: '/main/contacts',
    disabled: true
  },
  {
    id: 'visits',
    lable: 'Visits',
    svgIcon: SvgIcons.IconCalander,
    routerLink: '/main/visits',
    disabled: true
  }
];

const initialstate: Readonly<State> = Object.freeze<State>({
  menuItems: mainMenuItems
});

export function reducer(state: Readonly<State> = initialstate, action: Actions.Any): Readonly<State> {
  switch (action.type) {
    case Actions.SELECT_MENU_ITEM:
      return {
        ...state,
        menuItems: selectMenuItem(state.menuItems, action.item)
      };
    default: {
      return state;
    }
  }
}

function selectMenuItem(menuItems: MainMenuItem[], menuItem: MainMenuItem) {
  return menuItems.map(val => ({ ...val, selected: menuItem.id === val.id }));
}

export const getMainMenuItems = (state: State) => state.menuItems;
