"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/Logo';
import { useAuth } from '@/hooks/useAuth';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export function Header() {
  const { user, logout } = useAuth();
  const isMobile = useIsMobile();

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/verify', label: 'Verify ID' },
    { href: '/admin', label: 'Admin' },
  ];
  
  const NavContent = () => (
    <>
      {navLinks.map((link) => (
        <Button key={link.href} asChild variant="ghost">
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </>
  )

  const AuthButtons = () => (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <Button asChild>
            <Link href="/dashboard"><User className="mr-2 h-4 w-4" />Dashboard</Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/register">Register</Link>
          </Button>
        </>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        
        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 py-8">
                <NavContent />
                <div className="border-t pt-4">
                  <AuthButtons />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <nav className="hidden items-center gap-2 md:flex">
              <NavContent />
            </nav>
            <div className="hidden items-center gap-2 md:flex">
              <AuthButtons />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
