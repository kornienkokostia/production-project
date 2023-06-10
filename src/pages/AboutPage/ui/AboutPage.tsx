import React from 'react';
import { useTranslation } from 'react-i18next';

function AboutPage() {
  const { t } = useTranslation();

  return <div>{t('About page')}</div>;
}

export default AboutPage;
