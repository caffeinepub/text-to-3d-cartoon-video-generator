import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { CharacterType, Environment, EmotionalTone } from '@/backend';
import type { AnimationData } from '@/backend';
import { toast } from 'sonner';
import { useState, useRef, useEffect } from 'react';

interface AnimationPreviewProps {
  prompt: string;
  characterType: CharacterType;
  color: string;
  environment: Environment;
  emotionalTone: EmotionalTone;
  animationData?: AnimationData | null;
}

const emotionLabels = {
  [EmotionalTone.happy]: 'Happy',
  [EmotionalTone.sad]: 'Sad',
  [EmotionalTone.excited]: 'Excited',
  [EmotionalTone.surprised]: 'Surprised',
};

const emotionIcons = {
  [EmotionalTone.happy]: '/assets/generated/emotion-happy-icon-transparent.dim_32x32.png',
  [EmotionalTone.sad]: '/assets/generated/emotion-sad-icon-transparent.dim_32x32.png',
  [EmotionalTone.excited]: '/assets/generated/emotion-excited-icon-transparent.dim_32x32.png',
  [EmotionalTone.surprised]: '/assets/generated/emotion-surprised-icon-transparent.dim_32x32.png',
};

export default function AnimationPreview({
  prompt,
  characterType,
  color,
  environment,
  emotionalTone,
  animationData,
}: AnimationPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const narrationAudioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      if (narrationAudioRef.current) {
        narrationAudioRef.current.pause();
        narrationAudioRef.current = null;
      }
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
        backgroundAudioRef.current = null;
      }
    };
  }, []);

  const handlePlay = () => {
    if (animationData) {
      setIsPlaying(true);
      
      // Play narration audio if available
      if (animationData.audioSettings.includeNarration && animationData.narrationAudioBlob) {
        try {
          const narrationUrl = animationData.narrationAudioBlob.getDirectURL();
          if (!narrationAudioRef.current) {
            narrationAudioRef.current = new Audio(narrationUrl);
            narrationAudioRef.current.volume = Number(animationData.audioSettings.narrationVolume) / 100;
          }
          narrationAudioRef.current.muted = audioMuted;
          narrationAudioRef.current.play().catch(err => console.error('Narration playback error:', err));
        } catch (err) {
          console.error('Error loading narration audio:', err);
        }
      }

      // Play background audio if available
      if (animationData.audioSettings.includeSoundEffects && animationData.backgroundAudioBlob) {
        try {
          const backgroundUrl = animationData.backgroundAudioBlob.getDirectURL();
          if (!backgroundAudioRef.current) {
            backgroundAudioRef.current = new Audio(backgroundUrl);
            backgroundAudioRef.current.volume = Number(animationData.audioSettings.soundEffectsVolume) / 100;
            backgroundAudioRef.current.loop = true;
          }
          backgroundAudioRef.current.muted = audioMuted;
          backgroundAudioRef.current.play().catch(err => console.error('Background audio playback error:', err));
        } catch (err) {
          console.error('Error loading background audio:', err);
        }
      }

      toast.success('Playing animation with audio');
    } else {
      toast.info('Generate an animation first to play it');
    }
  };

  const handleDownload = () => {
    if (animationData?.videoBlob) {
      try {
        const videoUrl = animationData.videoBlob.getDirectURL();
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
    } else {
      toast.error('No video available for download');
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    if (narrationAudioRef.current) {
      narrationAudioRef.current.pause();
      narrationAudioRef.current.currentTime = 0;
    }
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.pause();
      backgroundAudioRef.current.currentTime = 0;
    }
    toast.success('Preview reset!');
  };

  const toggleAudioMute = () => {
    const newMutedState = !audioMuted;
    setAudioMuted(newMutedState);
    
    if (narrationAudioRef.current) {
      narrationAudioRef.current.muted = newMutedState;
    }
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.muted = newMutedState;
    }
    
    toast.info(newMutedState ? 'Audio muted' : 'Audio unmuted');
  };

  const getEnvironmentImage = (env: Environment) => {
    switch (env) {
      case Environment.space:
        return '/assets/generated/space-background.dim_600x400.png';
      case Environment.forest:
        return '/assets/generated/forest-background.dim_600x400.png';
      case Environment.city:
        return '/assets/generated/city-background.dim_600x400.png';
      default:
        return '/assets/generated/space-background.dim_600x400.png';
    }
  };

  const hasAudio = animationData && (
    (animationData.audioSettings.includeNarration && animationData.narrationAudioBlob) ||
    (animationData.audioSettings.includeSoundEffects && animationData.backgroundAudioBlob)
  );

  return (
    <Card className="border-purple-200/50 bg-white/80 backdrop-blur-sm dark:border-purple-800/50 dark:bg-gray-900/80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Animation Preview</CardTitle>
          {hasAudio && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAudioMute}
              className="h-8 w-8 p-0"
            >
              {audioMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-purple-200/50 bg-gradient-to-br from-purple-100 to-pink-100 dark:border-purple-800/50 dark:from-purple-900/20 dark:to-pink-900/20">
          {prompt ? (
            <div className="relative h-full w-full">
              <img
                src={getEnvironmentImage(environment)}
                alt={`${environment} environment`}
                className="absolute inset-0 h-full w-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={isPlaying ? 'animate-bounce' : ''}>
                  <img
                    src="/assets/generated/sample-cat-dancing-transparent.dim_200x200.png"
                    alt="Character preview"
                    className="h-40 w-auto drop-shadow-2xl"
                    style={{ filter: `hue-rotate(${getHueRotation(color)}deg)` }}
                  />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/50 p-3 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white">
                    <span className="font-semibold">Type:</span> {characterType} •{' '}
                    <span className="font-semibold">Scene:</span> {environment}
                  </p>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    <img 
                      src={emotionIcons[emotionalTone]} 
                      alt={emotionLabels[emotionalTone]} 
                      className="mr-1 h-3 w-3"
                    />
                    {emotionLabels[emotionalTone]}
                  </Badge>
                </div>
              </div>
              {hasAudio && (
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-black/50 text-white border-0 backdrop-blur-sm">
                    <img 
                      src="/assets/generated/audio-wave-icon-transparent.dim_32x32.png" 
                      alt="Audio" 
                      className="mr-1 h-3 w-3"
                    />
                    Audio
                  </Badge>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <img
                  src="/assets/generated/character-placeholder-transparent.dim_150x200.png"
                  alt="Character placeholder"
                  className="mx-auto mb-4 h-32 w-auto opacity-50"
                />
                <p className="text-sm text-muted-foreground">
                  Enter a prompt to generate your animation
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={handlePlay} className="flex-1" variant="default" disabled={!animationData}>
            <Play className="mr-2 h-4 w-4" />
            Play
          </Button>
          <Button onClick={handleReset} variant="outline" disabled={!isPlaying}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button 
            onClick={handleDownload} 
            variant="outline"
            disabled={!animationData?.videoBlob}
            title={animationData?.videoBlob ? 'Download video with audio' : 'No video available'}
          >
            <img 
              src="/assets/generated/download-icon-transparent.dim_64x64.png" 
              alt="Download" 
              className="mr-2 h-4 w-4"
            />
            Download
          </Button>
        </div>

        {prompt && (
          <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
            <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
              Current Prompt:
            </p>
            <p className="mt-1 text-sm text-purple-700 dark:text-purple-300">
              {prompt}
            </p>
            {animationData && (
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-purple-600 dark:text-purple-400">
                {animationData.audioSettings.includeNarration && (
                  <span className="flex items-center gap-1">
                    <img 
                      src="/assets/generated/microphone-icon-transparent.dim_32x32.png" 
                      alt="Narration" 
                      className="h-3 w-3"
                    />
                    Narration
                  </span>
                )}
                {animationData.audioSettings.includeSoundEffects && (
                  <span className="flex items-center gap-1">
                    <img 
                      src="/assets/generated/speaker-icon-transparent.dim_32x32.png" 
                      alt="Sound Effects" 
                      className="h-3 w-3"
                    />
                    Sound Effects
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getHueRotation(hexColor: string): number {
  // Simple hue rotation based on color - this is a simplified approach
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  
  if (delta === 0) return 0;
  
  let hue = 0;
  if (max === r) {
    hue = ((g - b) / delta) % 6;
  } else if (max === g) {
    hue = (b - r) / delta + 2;
  } else {
    hue = (r - g) / delta + 4;
  }
  
  hue = Math.round(hue * 60);
  if (hue < 0) hue += 360;
  
  return hue;
}
