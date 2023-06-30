import React from 'react';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import HomeIcon from 'shared/assets/icons/home.svg';
import AboutIcon from 'shared/assets/icons/about.svg';
import AccountIcon from 'shared/assets/icons/account.svg';
import ArticlesIcon from 'shared/assets/icons/articles.svg';

export interface SidebarItemType {
  path: string;
  route: AppRoutes;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGElement>>
  authOnly?: boolean
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.home,
    route: AppRoutes.HOME,
    Icon: HomeIcon,
    text: 'Home page',
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
    authOnly: true,
  },
  {
    path: RoutePath.articles,
    route: AppRoutes.ARTICLES,
    Icon: ArticlesIcon,
    text: 'Articles page',
    authOnly: true,
  },
];
