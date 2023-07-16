import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { AppRoutes, RoutePath } from '@/shared/config/routeConfig/routeConfig';
import HomeIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/about.svg';
import AccountIcon from '@/shared/assets/icons/account.svg';
import ArticlesIcon from '@/shared/assets/icons/articles.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
  getUserAuthData,
  (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
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

    ];
    if (userData) {
      sidebarItemsList.push(
        {
          path: RoutePath.account + userData.id,
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
      );
    }
    return sidebarItemsList;
  },
);
