"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, UserPlus, UploadCloud, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name is required.'),
  email: z.string().email('Invalid email address.'),
  walletAddress: z.string().min(1, 'Wallet address is required.'),
  idDocument: z.any().refine((file) => file?.length == 1, "ID Document is required."),
  selfie: z.any().refine((file) => file?.length == 1, "Selfie is required."),
});

export function RegisterClient() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      walletAddress: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate hashing and blockchain interaction
    toast({
        title: "Securing Identity...",
        description: "Hashing data and generating proof on the XRP Ledger.",
    });

    setTimeout(() => {
      login({ name: values.fullName, wallet: values.walletAddress });
      toast({
        title: "Registration Successful!",
        description: "Your decentralized identity has been created.",
      });
      router.push('/dashboard');
      setIsLoading(false);
    }, 2500);
  }

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit">
          <UserPlus className="h-8 w-8" />
        </div>
        <CardTitle className="font-headline text-3xl">Create Your Digital ID</CardTitle>
        <CardDescription>Join the future of secure, decentralized identity.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="walletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>XRPL Wallet Address</FormLabel>
                   <div className="flex items-center gap-2">
                    <FormControl>
                      <Input placeholder="rP9jPy..." {...field} />
                    </FormControl>
                    <Button type="button" variant="outline"><Wallet className="mr-2 h-4 w-4"/>Connect</Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                control={form.control}
                name="idDocument"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Government-issued ID</FormLabel>
                    <FormControl>
                        <Input type="file" className="hidden" id="id-upload" onChange={(e) => field.onChange(e.target.files)} />
                    </FormControl>
                    <label htmlFor="id-upload" className="cursor-pointer">
                        <div className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background hover:bg-accent/10">
                            <UploadCloud className="h-4 w-4" />
                            <span>Upload Document</span>
                        </div>
                    </label>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="selfie"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Selfie</FormLabel>
                    <FormControl>
                        <Input type="file" className="hidden" id="selfie-upload" onChange={(e) => field.onChange(e.target.files)} />
                    </FormControl>
                    <label htmlFor="selfie-upload" className="cursor-pointer">
                        <div className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background hover:bg-accent/10">
                            <UploadCloud className="h-4 w-4" />
                            <span>Upload Selfie</span>
                        </div>
                    </label>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Create Secure ID
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
