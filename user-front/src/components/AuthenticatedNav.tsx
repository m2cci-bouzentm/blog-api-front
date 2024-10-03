import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import React from 'react';
import { User } from '@/types';

interface AuthenticatedNavProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: (user: User | null) => void;
}
const AuthenticatedNav = ({ setIsLoggedIn, setCurrentUser }: AuthenticatedNavProps) => {
  const handleUserLogOut = (): void => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('userToken');
  };
  return (
    <>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <Button onClick={handleUserLogOut} type="submit" asChild>
        <Link to="/">Log Out</Link>
      </Button>
    </>
  );
};

export default AuthenticatedNav;
