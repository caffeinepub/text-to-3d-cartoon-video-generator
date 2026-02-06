import { Sparkles, Video, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';

interface HeaderProps {
  activeSection: 'generator' | 'gallery';
  onSectionChange: (section: 'generator' | 'gallery') => void;
}

export default function Header({ activeSection, onSectionChange }: HeaderProps) {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-200/50 bg-white/80 backdrop-blur-lg dark:border-purple-800/50 dark:bg-gray-900/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
              Cartoon3D
            </h1>
            <p className="text-xs text-muted-foreground">Text to 3D Video</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <Button
            variant={activeSection === 'generator' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onSectionChange('generator')}
            className="gap-2"
          >
            <Video className="h-4 w-4" />
            Generator
          </Button>
          <Button
            variant={activeSection === 'gallery' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onSectionChange('gallery')}
            className="gap-2"
          >
            <ImageIcon className="h-4 w-4" />
            Gallery
          </Button>
        </nav>

        <div>
          {isAuthenticated ? (
            <Button variant="outline" size="sm" onClick={clear}>
              Logout
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={isLoggingIn}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isLoggingIn ? 'Connecting...' : 'Login'}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
