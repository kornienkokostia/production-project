import { ReactElement } from 'react';
import { FeatureFlags } from '../../../types/featureFlags';
import { getFeatureFlags } from '../setGetFeatures';

interface ToggleFeaturesOptions {
  name: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
}

export const ToggleFeature = ({ name, on, off }: ToggleFeaturesOptions) => {
  if (getFeatureFlags(name)) {
    return on;
  }
  return off;
};
