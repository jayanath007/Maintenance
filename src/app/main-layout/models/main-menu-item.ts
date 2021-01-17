import { SvgIcons } from '../../shared';

export interface MainMenuItem {
  id: string;
  lable: string;
  svgIcon?: SvgIcons;
  icon?: string;
  hidden?: boolean;
  selected?: boolean;
  disabled?: boolean;
  routerLink: string;
}
