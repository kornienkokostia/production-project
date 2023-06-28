import React, { Suspense, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';
import { AppRouter } from './providers/router';

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const onToggle = () => setCollapsed(prev => !prev);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div
          className={classNames('content-page', {}, [collapsed ? 'full' : ''])}
        >
          <Sidebar onToggle={onToggle} />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
