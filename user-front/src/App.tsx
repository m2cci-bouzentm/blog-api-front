import { useEffect, useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';

import MainComponent from './components/MainComponent';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';
import AuthenticatedNav from './components/AuthenticatedNav';
import NotAuthenticatedNav from './components/NotAuthenticatedNav';
import PostComponent from './components/PostComponent';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // useEffect(() => {});

  return (
    <>
      <Router>
        <NavigationMenu className="w-[80%] self-center p-10 flex justify-between">
          <NavigationMenuList>
            <NavigationMenuItem className="text-[24px]">
              <Link className="font-bold" to="/">
                BlogySite
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>

          <div className="space-x-6 flex not-authenticated">
            {isLoggedIn ? (
              <AuthenticatedNav setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <NotAuthenticatedNav />
            )}
          </div>
        </NavigationMenu>

        <main className="w-[60%] flex flex-col m-auto space-y-8">
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />}></Route>
            <Route path="/posts" element={<MainComponent />}></Route>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="/signup" element={<SignUpComponent />}></Route>
            <Route path="/posts/:id" element={<PostComponent />}></Route>
          </Routes>
        </main>

        <footer className="mt-[400px]"></footer>
      </Router>
    </>
  );
}

export default App;
