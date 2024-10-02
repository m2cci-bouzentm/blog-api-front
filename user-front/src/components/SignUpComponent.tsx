import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRef } from 'react';

const SignUpComponent = () => {
  const form = useForm();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);

  const handleUserSignUp = (e: React.FormEvent): void => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const passwordConfirmation = passwordConfirmationRef.current?.value;
    console.log(username, email, password, passwordConfirmation);
  };
  return (
    <Form {...form}>
      <form onSubmit={handleUserSignUp} className="space-y-8 w-[50%] m-auto">
        <FormItem>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input placeholder="" id="username" type="text" name="username" ref={usernameRef} />
          {/* <FormDescription>This is your public display name.</FormDescription> */}
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input placeholder="" id="email" type="text" name="email" ref={emailRef} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input placeholder="" id="password" type="password" name="password" ref={passwordRef} />
          {/* <FormDescription>This is your public display name.</FormDescription> */}
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
        <Button type="submit">Sign Up</Button>
      </form>
    </Form>
  );
};

export default SignUpComponent;
