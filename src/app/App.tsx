import React, {
  MutableRefObject,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, initAuthData } from '@/entities/User';
import { getNavbarCollapsed, getContentLoaded } from '@/entities/AppState';
import { AppRouter } from './providers/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Preview } from '@/shared/ui/Preview';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);
  const navbarCollapsed = useSelector(getNavbarCollapsed);
  const [previewHidden, setPreviewHidden] = useState(false);
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;
  const contentLoaded = useSelector(getContentLoaded);

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  useEffect(() => {
    if (contentLoaded) {
      timeRef.current = setTimeout(() => {
        setPreviewHidden(true);
      }, 250);
    }
    return () => clearTimeout(timeRef.current);
  }, [contentLoaded]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div
          className={classNames('content-page', {}, [
            navbarCollapsed ? 'full' : '',
          ])}
        >
          <Sidebar />
          {inited && <AppRouter />}
          {!previewHidden && <Preview hidden={contentLoaded} />}
        </div>
      </Suspense>
    </div>
  );
}

export default App;
