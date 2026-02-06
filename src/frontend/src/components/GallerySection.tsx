import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Calendar } from 'lucide-react';
import { useGetAllAnimations } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function GallerySection() {
  const { data: animations, isLoading, error } = useGetAllAnimations();

  const handlePlay = (id: string) => {
    toast.info(`Playing animation: ${id}`);
  };

  const handleDownload = (videoUrl: string, prompt: string) => {
    try {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = `${prompt.slice(0, 30).replace(/[^a-z0-9]/gi, '_')}_animation.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Download started');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download video. Please try again.');
    }
  };

  if (error) {
    return (
      <section className="container mx-auto px-4 py-8">
        <Card className="border-destructive/50 bg-destructive/10">
          <CardContent className="pt-6">
            <p className="text-center text-destructive">
              Failed to load animations. Please try again later.
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Your Animations</h2>
        <p className="text-muted-foreground">Browse and manage your generated 3D cartoon videos with audio</p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="border-purple-200/50 dark:border-purple-800/50">
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="aspect-video w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : animations && animations.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {animations.map((animation) => {
            const hasAudio = animation.audioSettings.includeNarration || animation.audioSettings.includeSoundEffects;
            
            return (
              <Card
                key={animation.id}
                className="border-purple-200/50 bg-white/80 backdrop-blur-sm transition-all hover:shadow-lg dark:border-purple-800/50 dark:bg-gray-900/80"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="line-clamp-2 text-base flex-1">{animation.prompt}</CardTitle>
                    <div className="flex shrink-0 gap-1">
                      {animation.isAIGenerated && (
                        <Badge 
                          variant="secondary" 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0"
                        >
                          <img 
                            src="/assets/generated/ai-badge-icon-transparent.dim_32x32.png" 
                            alt="AI" 
                            className="mr-1 h-3 w-3"
                          />
                          AI
                        </Badge>
                      )}
                      {hasAudio && (
                        <Badge variant="secondary" className="bg-blue-500 text-white border-0">
                          <img 
                            src="/assets/generated/audio-wave-icon-transparent.dim_32x32.png" 
                            alt="Audio" 
                            className="h-3 w-3"
                          />
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20">
                    <img
                      src="/assets/generated/sample-cat-dancing-transparent.dim_200x200.png"
                      alt={animation.prompt}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(Number(animation.createdAt) / 1000000).toLocaleDateString()}
                    </div>
                    {hasAudio && (
                      <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                        {animation.audioSettings.includeNarration && (
                          <img 
                            src="/assets/generated/microphone-icon-transparent.dim_32x32.png" 
                            alt="Narration" 
                            className="h-3 w-3"
                            title="Includes narration"
                          />
                        )}
                        {animation.audioSettings.includeSoundEffects && (
                          <img 
                            src="/assets/generated/speaker-icon-transparent.dim_32x32.png" 
                            alt="Sound Effects" 
                            className="h-3 w-3"
                            title="Includes sound effects"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handlePlay(animation.id)}
                  >
                    <Play className="mr-1 h-3 w-3" />
                    Play
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(animation.videoBlob.getDirectURL(), animation.prompt)}
                    title="Download video with audio"
                  >
                    <img 
                      src="/assets/generated/download-icon-transparent.dim_64x64.png" 
                      alt="Download" 
                      className="h-4 w-4"
                    />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-purple-200/50 bg-white/80 backdrop-blur-sm dark:border-purple-800/50 dark:bg-gray-900/80">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <img
              src="/assets/generated/character-placeholder-transparent.dim_150x200.png"
              alt="No animations"
              className="mb-4 h-32 w-auto opacity-50"
            />
            <p className="mb-2 text-lg font-medium">No animations yet</p>
            <p className="text-sm text-muted-foreground">
              Create your first 3D cartoon animation to see it here!
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
