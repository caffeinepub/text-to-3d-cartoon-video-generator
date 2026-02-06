import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-purple-200/50 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:border-purple-800/50 dark:from-purple-900/50 dark:via-pink-900/50 dark:to-blue-900/50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
            <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              AI-Powered 3D Animation
            </span>
          </div>
          
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent dark:from-purple-400 dark:via-pink-400 dark:to-blue-400">
              Transform Text into
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
              3D Cartoon Videos
            </span>
          </h2>
          
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
            Create stunning 3D cartoon animations with just a text prompt. Customize characters, scenes, and bring your imagination to life in seconds.
          </p>

          <div className="relative w-full max-w-4xl">
            <img
              src="/assets/generated/hero-banner.dim_800x400.png"
              alt="3D Cartoon Animation Preview"
              className="w-full rounded-2xl shadow-2xl ring-1 ring-purple-200/50 dark:ring-purple-800/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
