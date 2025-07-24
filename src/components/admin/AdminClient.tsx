"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, FileDown, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type UserData = {
  id: string;
  name: string;
  walletAddress: string;
  hashedProof: string;
  status: 'Verified' | 'In Review' | 'Flagged';
};

const mockUsers: UserData[] = [
  { id: '1', name: 'Alice Johnson', walletAddress: 'rP9jPyP5qfV9gD9iW3t9aZ1xYcZ2bV...', hashedProof: 'a1b2c3d4...', status: 'Verified' },
  { id: '2', name: 'Bob Williams', walletAddress: 'rN7bA1k2yV3zC4d5fG6hJ7k8L9m0...', hashedProof: 'b2c3d4e5...', status: 'In Review' },
  { id: '3', name: 'Charlie Brown', walletAddress: 'rG8fE9d0C1b2A3k4H5j6L7m8N9p...', hashedProof: 'c3d4e5f6...', status: 'Flagged' },
];

export function AdminClient() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (searchTerm.trim() === '') {
        setSearchResults(mockUsers);
      } else {
        setSearchResults(
          mockUsers.filter(
            (u) =>
              u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              u.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your CSV export of verification results has been initiated.",
    });
  }

  if (authLoading || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const statusVariant = (status: UserData['status']): "default" | "secondary" | "destructive" => {
    if (status === 'Verified') return 'default';
    if (status === 'In Review') return 'secondary';
    return 'destructive';
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold text-primary">Admin Portal</h1>
        <p className="text-lg text-foreground/80">Manage and verify user identities.</p>
      </header>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">User Lookup</CardTitle>
            <CardDescription>Search for users by name, wallet, or token.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input 
                placeholder="Search..." 
                className="flex-grow" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search />}
                <span className="ml-2 hidden sm:inline">Search</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline">Verification Results</CardTitle>
              <CardDescription>
                {searchResults.length > 0 ? `Showing ${searchResults.length} results.` : 'Perform a search to see results.'}
              </CardDescription>
            </div>
            <Button variant="outline" onClick={handleExport}>
              <FileDown className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>Hashed Proof</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  searchResults.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell className="font-mono text-sm">{u.walletAddress}</TableCell>
                      <TableCell className="font-mono text-sm">{u.hashedProof}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(u.status)}>{u.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
