import React, { useEffect } from 'react';
import { appStateActions } from '@/entities/AppState';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AboutPageHeader } from '../AboutPageHeader/AboutPageHeader';
import cls from './AboutPage.module.scss';

function AboutPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(appStateActions.setContentLoaded(true));
  }, [dispatch]);

  return (
    <div className={cls.AboutPage}>
      <AboutPageHeader />
      <div className={cls.AboutPageInfo}>
        <div>
          <a
            href="https://github.com/kornienkokostia/production-project"
            target="_blank"
            rel="noreferrer"
          >
            Git Hub Repo
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
