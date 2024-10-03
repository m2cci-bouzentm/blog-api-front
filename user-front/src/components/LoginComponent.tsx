import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const form = useForm();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    await res.json();

    // TODO log in user AND redirect to /posts
    //TODO Errors displaying
    navigate('/');
  };
  return (
    <Form {...form}>
      <form onSubmit={handleUserLogin} className="space-y-8 w-[50%] m-auto">
        <FormItem>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input placeholder="" id="username" type="text" name="username" ref={usernameRef} />
          {/* <FormDescription>This is your public display name.</FormDescription> */}
        </FormItem>

        <FormItem>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input placeholder="" id="password" type="password" name="password" ref={passwordRef} />
          {/* <FormDescription>This is your public display name.</FormDescription> */}
        </FormItem>

        <Button type="submit">Sign In</Button>
      </form>
    </Form>
  );
};

export default LoginComponent;
