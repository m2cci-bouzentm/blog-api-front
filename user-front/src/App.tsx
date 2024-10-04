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
import { User } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      fetch('http://localhost:3000/verifyLogin', {
        method: 'POST',
        headers: { Authorization: `Bearer ${userToken}` },
      })
        .then((res) => res.json())
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <Router>
        <NavigationMenu className="w-full lg:w-[80%] self-center py-5 px-2 lg:p-10 flex justify-between">
          <NavigationMenuList>
            <NavigationMenuItem className="text-[24px]">
              <Link className="font-bold" to="/">
                BlogySite
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>

          <div className="space-x-6 flex not-authenticated">
            {isLoggedIn ? (
              <AuthenticatedNav
                currentUser={currentUser}
                setIsLoggedIn={setIsLoggedIn}
                setCurrentUser={setCurrentUser}
              />
            ) : (
              <NotAuthenticatedNav />
            )}
          </div>
        </NavigationMenu>

        <main className="w-[90%] sm:w-[75%] xl:w-[60%] flex flex-col m-auto space-y-8">
          <Routes>
            <Route path="/" element={<Navigate to="/posts" />}></Route>
            <Route path="/posts" element={<MainComponent />}></Route>
            <Route
              path="/posts/:id"
              element={<PostComponent isLoggedIn={isLoggedIn} currentUser={currentUser} />}
            ></Route>

            {/* Access these routes only if user wasn't logged in */}
            {!isLoggedIn && (
              <>
                <Route
                  path="/login"
                  element={
                    <LoginComponent setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <SignUpComponent
                      setIsLoggedIn={setIsLoggedIn}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />
              </>
            )}

            <Route path="*" element={<Navigate to="posts" />} />
          </Routes>
        </main>

        <footer className="mt-[400px]"></footer>
      </Router>
    </>
  );
}

export default App;
