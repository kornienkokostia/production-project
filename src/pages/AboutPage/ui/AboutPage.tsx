import React, { useEffect } from 'react';
import { appStateActions } from '@/entities/AppState';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

function AboutPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(appStateActions.setContentLoaded(true));
  }, [dispatch]);

  return (
    <div>
      <a
        href="https://github.com/kornienkokostia/production-project"
        target="_blank"
        rel="noreferrer"
      >
        Git Hub Repo
      </a>
    </div>
  );
}

export default AboutPage;
