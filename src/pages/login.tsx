import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/themeToggle';
import { AxiosError } from 'axios';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("token ", token)
    if (token) {
      navigate('/chat');
    }
  }, []);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/local', {
        identifier: values.email,
        password: values.password,
      });

      const { jwt, user } = response.data;
      localStorage.setItem('token', jwt);
      localStorage.setItem('user', JSON.stringify(user));

      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });

      navigate('/chat');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error?.response?.data?.error?.message || "Invalid credentials.";
        toast({
          variant: 'destructive',
          title: 'Error',
          description: errorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <div className="mx-auto max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-semibold dark:text-black">Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to sign in
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 dark:text-black">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        type="email"
                        {...field}
                        className="border border-gray-300 p-3 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        {...field}
                        className="border border-gray-300 p-3 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full p-3 bg-primary text-white dark:text-black rounded-md hover:bg-primary-dark transition-all duration-200"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm mt-4 dark:text-black">
            Don’t have an account?{' '}
            <div
              className="inline-block p-1 cursor-pointer text-black hover:underline"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
