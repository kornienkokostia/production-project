import { FeatureFlags } from '@/shared/types/featureFlags';

let featureFlags: FeatureFlags;

export const setFeatureFlags = (newFeatureFlag?: FeatureFlags) => {
  if (newFeatureFlag) {
    featureFlags = newFeatureFlag;
  }
};

export const getFeatureFlags = (flag: keyof FeatureFlags) => featureFlags[flag];
