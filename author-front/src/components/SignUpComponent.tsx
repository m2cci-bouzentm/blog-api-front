import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, validationError } from '@/types';

interface SignUpComponentProps {
  setUserToken: (token: string) => void;
  setCurrentUser: (user: User) => void;
  setIsLoggedIn: (userState: boolean) => void;
}

const SignUpComponent = ({ setUserToken, setCurrentUser, setIsLoggedIn }: SignUpComponentProps) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);
  const authorKeyRef = useRef<HTMLInputElement>(null);

  const [signUpError, setSignUpError] = useState<validationError | null>(null);

  const form = useForm();

  const navigate = useNavigate();

  const handleUserSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirmation = passwordConfirmationRef.current?.value;
    const authorKey = authorKeyRef.current?.value;

    // author key validation, author cant sign without the secret key
    if (username && email && password && passwordConfirmation) {
      if (!authorKey) {
        return setSignUpError({ msg: 'Author key is required' });
      } else if (authorKey !== import.meta.env.VITE_AUTHOR_KEY) {
        return setSignUpError({ msg: 'Enter a valid author key' });
      }
    }
    const res = await fetch(import.meta.env.VITE_API_BASE_URL + '/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, passwordConfirmation, authorKey }),
    });

    const logInRes = await res.json();

    //Signup Errors display
    if (typeof logInRes.errors !== 'undefined') {
      return setSignUpError(logInRes.errors[0]);
    }

    localStorage.setItem('authorToken', logInRes.token);
    setUserToken(logInRes.token);
    setSignUpError(null);
    setCurrentUser(logInRes.user);
    setIsLoggedIn(true);
    navigate('/');
  };
  return (
    <Form {...form}>
      <form className="space-y-8 w-[50%] m-auto">
        <FormItem>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input placeholder="" id="username" type="text" name="username" ref={usernameRef} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input placeholder="" id="email" type="text" name="email" ref={emailRef} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input placeholder="" id="password" type="password" name="password" ref={passwordRef} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="passwordConfirmation">Password Confirmation</FormLabel>
          <Input
            placeholder=""
            type="password"
            name="passwordConfirmation"
            ref={passwordConfirmationRef}
          />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="authorKey">Author key</FormLabel>
          <Input placeholder="" type="password" name="authorKey" ref={authorKeyRef} />
        </FormItem>
        {signUpError && <FormMessage>{signUpError.msg}</FormMessage>}
        <Button onClick={handleUserSignUp}>Sign Up</Button>
      </form>
    </Form>
  );
};

export default SignUpComponent;
