import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import React from 'react';
import { User } from '@/types';

interface AuthenticatedNavProps {
  currentUser: User | null;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: (user: User | null) => void;
}
const AuthenticatedNav = ({
  currentUser,
  setIsLoggedIn,
  setCurrentUser,
}: AuthenticatedNavProps) => {
  const handleUserLogOut = (): void => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('userToken');
  };
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage
          src={
            typeof currentUser?.avatarUrl !== 'undefined'
              ? currentUser?.avatarUrl
              : 'https://github.com/shadcn.png'
          }
        />
      </Avatar>
      <span>{currentUser?.username}</span>
      <Button className="h-7 lg:h-10" onClick={handleUserLogOut} type="submit" asChild>
        <Link to="/">Log Out</Link>
      </Button>
    </div>
  );
};

export default AuthenticatedNav;
