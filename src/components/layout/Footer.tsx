import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-card">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} IDyn Inc.</p>
        <div className="flex items-center gap-4 text-sm">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
