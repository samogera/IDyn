"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Search, ShieldCheck, Clock, ShieldAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type VerificationStatus = 'Verified' | 'Pending' | 'Invalid';
type VerificationResult = {
  status: VerificationStatus;
  wallet: string;
};

export function VerifyClient() {
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = () => {
    if (!walletAddress) return;
    setIsLoading(true);
    setResult(null);

    // Simulate API call to XRPL or backend
    setTimeout(() => {
      let status: VerificationStatus = 'Invalid';
      const lastChar = walletAddress.slice(-1);

      if (['a','b','c','d','e','f'].includes(lastChar.toLowerCase())) {
        status = 'Verified';
      } else if (['1','2','3','4','5'].includes(lastChar)) {
        status = 'Pending';
      }

      setResult({ status, wallet: walletAddress });
      setIsLoading(false);
    }, 1500);
  };

  const getStatusInfo = (status: VerificationStatus) => {
    switch (status) {
      case 'Verified':
        return {
          icon: <ShieldCheck className="h-16 w-16 text-green-500" />,
          title: 'Identity Verified',
          description: 'This identity has been successfully verified on the XRP Ledger.',
          badgeVariant: 'default' as const,
        };
      case 'Pending':
        return {
          icon: <Clock className="h-16 w-16 text-yellow-500" />,
          title: 'Verification Pending',
          description: 'This identity is still in the verification process.',
          badgeVariant: 'secondary' as const,
        };
      case 'Invalid':
        return {
          icon: <ShieldAlert className="h-16 w-16 text-red-500" />,
          title: 'Identity Not Found',
          description: 'This wallet address does not have a valid identity proof associated with it.',
          badgeVariant: 'destructive' as const,
        };
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Decentralized Verification</CardTitle>
          <CardDescription>Enter a user's wallet address or verification token to validate their identity proof from the XRP Ledger.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter wallet address or token..."
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            />
            <Button onClick={handleVerify} disabled={isLoading || !walletAddress}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search />}
              <span className="ml-2 hidden sm:inline">Verify</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 flex justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {result && (
        <Card className="mt-8 animate-in fade-in-50">
          <CardContent className="p-6 text-center">
            {getStatusInfo(result.status).icon}
            <h2 className="font-headline mt-4 text-2xl font-bold">{getStatusInfo(result.status).title}</h2>
            <p className="mt-2 text-muted-foreground">{getStatusInfo(result.status).description}</p>
            <div className="mt-4">
              <Badge variant={getStatusInfo(result.status).badgeVariant} className="text-md px-4 py-1">
                {result.status}
              </Badge>
            </div>
            <p className="font-mono mt-4 text-sm text-foreground/60 break-all">{result.wallet}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
