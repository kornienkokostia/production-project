import { AppRoutes } from '@/shared/const/router';

export interface SidebarItemType {
  path: string;
  route: AppRoutes;
  text: string;
  Icon: React.FC<React.SVGProps<SVGElement>>
  authOnly?: boolean
}
