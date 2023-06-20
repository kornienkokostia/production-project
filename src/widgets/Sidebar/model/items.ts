import React from "react";
import { AppRoutes, RoutePath } from "shared/config/routeConfig/routeConfig";
import HomeIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import AccountIcon from 'shared/assets/icons/account.svg';

export interface SidebarItemType {
  path: string;
  route: AppRoutes;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGElement>>
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    route: AppRoutes.MAIN,
    Icon: HomeIcon,
    text: 'Main page',
  },
  {
    path: RoutePath.about,
    route: AppRoutes.ABOUT,
    Icon: AboutIcon,
    text: 'About page',
  },
  {
    path: RoutePath.account,
    route: AppRoutes.ACCOUNT,
    Icon: AccountIcon,
    text: 'Account page',
  }
]