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
import { getNavbarCollapsed } from '@/entities/AppState';
import { AppRouter } from './providers/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from '@/shared/ui/Loader';
import { Preview } from '@/shared/ui/Preview';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const inited = useSelector(getUserInited);
  const navbarCollapsed = useSelector(getNavbarCollapsed);
  const [previewHidden, setPreviewHidden] = useState(false);
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  useEffect(() => {
    if (inited) {
      timeRef.current = setTimeout(() => {
        setPreviewHidden(true);
      }, 250);
    }
    return () => clearTimeout(timeRef.current);
  }, [inited]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div
          className={classNames('content-page', {}, [
            navbarCollapsed ? 'full' : '',
          ])}>
          <Sidebar />
          {inited && <AppRouter />}
          {!previewHidden && <Preview hidden={inited} />}
        </div>
      </Suspense>
    </div>
  );
}

export default App;
