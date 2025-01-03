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
import NewPostComponent from './components/NewPostComponent';
import EditPostComponent from './components/EditPostComponent';
import SettingsComponent from './components/SettingsComponent';

// Attached user token to each request except for logging in and signing up
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const currentUserToken = localStorage.getItem('authorToken');

    if (currentUserToken) {
      setUserToken(currentUserToken);
      fetch(import.meta.env.VITE_API_BASE_URL + '/verifyLogin', {
        method: 'POST',
        headers: { Authorization: `Bearer ${currentUserToken}` },
      })
        .then((res) => res.json())
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('authorToken');
        });
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const currentUserToken = localStorage.getItem('authorToken');
    fetch(import.meta.env.VITE_API_BASE_URL + '/verifyLogin', {
      method: 'POST',
      headers: { Authorization: `Bearer ${currentUserToken}` },
    })
      .then((res) => res.json())
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem('authorToken');
      });
  }, [userToken]);

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
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route
              path="/posts"
              element={
                <MainComponent
                  currentUser={currentUser}
                  isLoggedIn={isLoggedIn}
                  userToken={userToken}
                />
              }
            />
            {currentUser?.role === 'ROLE_AUTHOR' && (
              <>
                <Route
                  path="/posts/new"
                  element={<NewPostComponent userToken={userToken} currentUser={currentUser} />}
                />
                <Route
                  path="/posts/edit"
                  element={<EditPostComponent userToken={userToken} currentUser={currentUser} />}
                />
              </>
            )}
            <Route
              path="/posts/:id"
              element={
                <PostComponent
                  userToken={userToken}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                />
              }
            />

            {isLoggedIn && (
              <Route
                path="/settings/"
                element={
                  <SettingsComponent
                    currentUser={currentUser}
                    userToken={userToken}
                    setCurrentUser={setCurrentUser}
                    setUserToken={setUserToken}
                  />
                }
              />
            )}

            {/* Access these routes only if user wasn't logged in */}
            {!isLoggedIn && (
              <>
                <Route
                  path="/login"
                  element={
                    <LoginComponent
                      setUserToken={setUserToken}
                      setIsLoggedIn={setIsLoggedIn}
                      setCurrentUser={setCurrentUser}
                    />
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <SignUpComponent
                      setUserToken={setUserToken}
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

        <footer className="py-[50px]"></footer>
      </Router>
    </>
  );
}

export default App;
