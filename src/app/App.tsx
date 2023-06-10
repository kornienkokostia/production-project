import React, { Suspense, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { AppRouter } from './providers/router';
import { Modal } from 'shared/ui/Modal/Modal';

function App() {
  const { theme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        {/* <button onClick={() => setIsOpen(true)}>modal</button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}

export default App;
