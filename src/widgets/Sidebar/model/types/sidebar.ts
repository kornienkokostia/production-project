import { AppRoutes } from "shared/config/routeConfig/routeConfig";

export interface SidebarItemType {
  path: string;
  route: AppRoutes;
  text: string;
  Icon: React.VFC<React.SVGProps<SVGElement>>
  authOnly?: boolean
}