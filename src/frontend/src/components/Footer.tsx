import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-purple-200/50 bg-white/50 backdrop-blur-sm dark:border-purple-800/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <p className="flex items-center gap-1">
            © 2025. Built with{' '}
            <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />{' '}
            using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
