"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, ShieldCheck, Clock, AlertTriangle } from 'lucide-react';

type VerificationStatus = 'Verified' | 'In Review' | 'Flagged';
type VerificationEvent = {
  id: string;
  verifier: string;
  date: string;
  status: 'Approved' | 'Rejected';
};

const mockHistory: VerificationEvent[] = [
  { id: '1', verifier: 'Global Bank Inc.', date: '2023-10-26', status: 'Approved' },
  { id: '2', verifier: 'HealthNet Medical', date: '2023-10-24', status: 'Approved' },
  { id: '3', verifier: 'GovPortal', date: '2023-10-22', status: 'Approved' },
  { id: '4', verifier: 'CryptoEx', date: '2023-10-21', status: 'Rejected' },
];

export function DashboardClient() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [status] = useState<VerificationStatus>('Verified'); // Mock status

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const getStatusInfo = (currentStatus: VerificationStatus) => {
    switch (currentStatus) {
      case 'Verified':
        return {
          icon: <ShieldCheck className="h-8 w-8 text-green-500" />,
          badgeVariant: 'default' as const,
          description: 'Your identity is verified and active.',
        };
      case 'In Review':
        return {
          icon: <Clock className="h-8 w-8 text-yellow-500" />,
          badgeVariant: 'secondary' as const,
          description: 'Your identity is currently under review.',
        };
      case 'Flagged':
        return {
          icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
          badgeVariant: 'destructive' as const,
          description: 'Your identity has been flagged for a security review.',
        };
    }
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold text-primary">Dashboard</h1>
        <p className="text-lg text-foreground/80">Welcome back, {user?.name}!</p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Identity Status</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
              {statusInfo.icon}
              <Badge variant={statusInfo.badgeVariant} className="px-4 py-2 text-lg">
                {status}
              </Badge>
              <p className="text-muted-foreground">{statusInfo.description}</p>
              <p className="font-mono text-sm text-foreground/60 break-all">{user.wallet}</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Verification History</CardTitle>
              <CardDescription>Recent verification events associated with your ID.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Verifier</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockHistory.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.verifier}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell className="text-right">
                        <span className={`font-semibold ${event.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>
                          {event.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
