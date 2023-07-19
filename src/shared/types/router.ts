import { Location, RouteProps } from 'react-router-dom';
// eslint-disable-next-line iblog-plugin/layer-imports
import { UserRole } from '@/entities/User';

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};

export interface locationState extends Location {
  state: {
    prevPath?: string;
  };
}
