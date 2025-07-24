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
import { Loader2, AlertTriangle, KeyRound } from 'lucide-react';
import { analyzeLoginBehavior } from '@/ai/flows/analyze-login-behavior';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const formSchema = z.object({
  walletAddress: z.string().min(1, 'Wallet address or email is required.'),
});

export function LoginClient() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showThreatDialog, setShowThreatDialog] = useState(false);
  const [loginData, setLoginData] = useState<z.infer<typeof formSchema> | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      walletAddress: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const behavioralData = {
        ipAddress: '192.168.1.100', // Mock data
        geolocation: 'New York, USA', // Mock data
        browserFingerprint: 'a1b2c3d4e5f6g7h8i9j0', // Mock data
        userId: values.walletAddress,
      };

      const analysis = await analyzeLoginBehavior(behavioralData);

      if (analysis.fraudRiskScore > 0.7) {
        setLoginData(values);
        setShowThreatDialog(true);
        setIsLoading(false);
        return;
      }
      
      // If no threat, proceed with login
      proceedWithLogin(values);

    } catch (error) {
      console.error("AI analysis failed, proceeding with login:", error);
      proceedWithLogin(values);
    }
  }

  function proceedWithLogin(values: z.infer<typeof formSchema>) {
    // Simulate API call
    setTimeout(() => {
      login({ name: 'Verified User', wallet: values.walletAddress });
      router.push('/dashboard');
      setIsLoading(false);
    }, 1000);
  }

  const handleProceedFromDialog = () => {
    setShowThreatDialog(false);
    if(loginData) {
      setIsLoading(true);
      proceedWithLogin(loginData);
    }
  }

  return (
    <>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
           <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit">
              <KeyRound className="h-8 w-8" />
           </div>
          <CardTitle className="font-headline text-3xl">Welcome Back</CardTitle>
          <CardDescription>Log in with your wallet to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Address or Email</FormLabel>
                    <FormControl>
                      <Input placeholder="rP9jPy... or user@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Login with Wallet
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-primary underline-offset-4 hover:underline">
              Register
            </Link>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showThreatDialog} onOpenChange={setShowThreatDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex justify-center">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
            <AlertDialogTitle className="text-center font-headline">Unusual Login Attempt</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              Our AI system has flagged this login as potentially suspicious. Please verify that this is you.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleProceedFromDialog} className="bg-destructive hover:bg-destructive/90">
              Proceed Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
