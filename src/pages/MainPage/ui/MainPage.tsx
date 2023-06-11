import { Counter } from 'entities/Counter';
import React from 'react';
import { useTranslation } from 'react-i18next';

function MainPage() {
  const { t } = useTranslation();
  return (
    <div>
      {t('Main page')}
      <Counter />
    </div>
  );
}

export default MainPage;
