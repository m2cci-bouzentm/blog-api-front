import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import React from 'react';

interface AuthenticatedNavProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
const AuthenticatedNav = ({ setIsLoggedIn }: AuthenticatedNavProps) => {
  const handleUserLogOut = (e: React.MouseEvent): void => {
    setIsLoggedIn(false);
    console.log(e);
    console.log('logging out');
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
