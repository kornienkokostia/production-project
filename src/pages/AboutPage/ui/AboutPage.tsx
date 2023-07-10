import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Page } from 'widgets/Page/Page';

function AboutPage() {
  const { t } = useTranslation();

  return (
    <div>
      <a
        href={'https://github.com/kornienkokostia/production-project'}
        target={'_blank'}>
        Git Hub Repo
      </a>
    </div>
  );
}

export default AboutPage;
