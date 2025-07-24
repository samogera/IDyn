import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, Cpu, KeyRound } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: 'Secure Onboarding',
      description: 'Upload your documents to generate a tamper-proof digital identity record on the XRP Ledger.',
    },
    {
      icon: <KeyRound className="h-10 w-10 text-primary" />,
      title: 'Decentralized Verification',
      description: 'Third-parties can verify your identity seamlessly without compromising your private data.',
    },
    {
      icon: <Cpu className="h-10 w-10 text-primary" />,
      title: 'AI-Powered Monitoring',
      description: 'Our system analyzes behavioral metrics to detect and flag anomalies, protecting you from fraud.',
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Register Your ID',
      description: 'Create an account and connect your XRPL-compatible wallet.',
    },
    {
      step: 2,
      title: 'Secure Your Data',
      description: 'Upload your documents. We hash your data and anchor it to the blockchain.',
    },
    {
      step: 3,
      title: 'Verify with Ease',
      description: 'Use your decentralized ID to prove your identity to any verifier on the network.',
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-card py-20 md:py-32">
        <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 text-center md:grid-cols-2 md:text-left">
          <div className="space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary md:text-5xl lg:text-6xl">
              Own Your Identity.
              <br />
              Secure Your Future.
            </h1>
            <p className="max-w-[600px] text-lg text-foreground/80 md:text-xl">
              IDyn provides a secure and decentralized way to manage your digital identity using the power of the XRP Ledger.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/register">Create My ID</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/verify">Verify an ID</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Shield className="h-48 w-48 text-primary/20 animate-pulse" strokeWidth={1.5}/>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Core Features</h2>
            <p className="mx-auto mt-4 max-w-2xl text-foreground/80">
              A robust platform designed for security, privacy, and user control.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="flex flex-col items-center p-6 text-center shadow-lg transition-transform hover:scale-105">
                <CardHeader className="p-0">
                  {feature.icon}
                  <CardTitle className="font-headline mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-2">
                  <p className="text-foreground/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="w-full bg-card py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-foreground/80">A simple, three-step process to decentralized identity.</p>
          </div>
          <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
             <div className="absolute top-1/2 left-0 hidden h-0.5 w-full -translate-y-1/2 bg-border md:block"></div>
            {howItWorks.map((step) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                 <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex h-16 w-16 items-center justify-center rounded-full border-4 border-card bg-primary font-headline text-2xl font-bold text-primary-foreground">
                  {step.step}
                </div>
                <div className="mt-8 rounded-lg bg-card p-6">
                    <h3 className="font-headline text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-foreground/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20">
         <div className="container mx-auto text-center">
          <h3 className="font-headline text-2xl font-semibold text-foreground/70">Powered by</h3>
          <p className="mt-2 text-4xl font-bold text-primary">XRP Ledger</p>
         </div>
      </section>
    </div>
  );
}
