import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmotionalTone } from '@/backend';
import type { AudioSettings } from '@/backend';
import { Volume2, Mic } from 'lucide-react';

interface AudioControlPanelProps {
  audioSettings: AudioSettings;
  emotionalTone: EmotionalTone;
  onAudioSettingsChange: (settings: AudioSettings) => void;
  onEmotionalToneChange: (tone: EmotionalTone) => void;
}

const emotionIcons = {
  [EmotionalTone.happy]: '/assets/generated/emotion-happy-icon-transparent.dim_32x32.png',
  [EmotionalTone.sad]: '/assets/generated/emotion-sad-icon-transparent.dim_32x32.png',
  [EmotionalTone.excited]: '/assets/generated/emotion-excited-icon-transparent.dim_32x32.png',
  [EmotionalTone.surprised]: '/assets/generated/emotion-surprised-icon-transparent.dim_32x32.png',
};

export default function AudioControlPanel({
  audioSettings,
  emotionalTone,
  onAudioSettingsChange,
  onEmotionalToneChange,
}: AudioControlPanelProps) {
  const handleNarrationToggle = (checked: boolean) => {
    onAudioSettingsChange({
      ...audioSettings,
      includeNarration: checked,
    });
  };

  const handleSoundEffectsToggle = (checked: boolean) => {
    onAudioSettingsChange({
      ...audioSettings,
      includeSoundEffects: checked,
    });
  };

  const handleNarrationVolumeChange = (value: number[]) => {
    onAudioSettingsChange({
      ...audioSettings,
      narrationVolume: BigInt(value[0]),
    });
  };

  const handleSoundEffectsVolumeChange = (value: number[]) => {
    onAudioSettingsChange({
      ...audioSettings,
      soundEffectsVolume: BigInt(value[0]),
    });
  };

  return (
    <Card className="border-purple-200/50 bg-white/80 backdrop-blur-sm dark:border-purple-800/50 dark:bg-gray-900/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <img 
            src="/assets/generated/audio-wave-icon-transparent.dim_32x32.png" 
            alt="Audio" 
            className="h-5 w-5"
          />
          Audio & Emotion Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Emotional Tone Selector */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <img 
              src={emotionIcons[emotionalTone]} 
              alt="Emotion" 
              className="h-4 w-4"
            />
            Emotional Tone
          </Label>
          <Select
            value={emotionalTone}
            onValueChange={(value) => onEmotionalToneChange(value as EmotionalTone)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EmotionalTone.happy}>
                <div className="flex items-center gap-2">
                  <img 
                    src={emotionIcons[EmotionalTone.happy]} 
                    alt="Happy" 
                    className="h-4 w-4"
                  />
                  Happy
                </div>
              </SelectItem>
              <SelectItem value={EmotionalTone.sad}>
                <div className="flex items-center gap-2">
                  <img 
                    src={emotionIcons[EmotionalTone.sad]} 
                    alt="Sad" 
                    className="h-4 w-4"
                  />
                  Sad
                </div>
              </SelectItem>
              <SelectItem value={EmotionalTone.excited}>
                <div className="flex items-center gap-2">
                  <img 
                    src={emotionIcons[EmotionalTone.excited]} 
                    alt="Excited" 
                    className="h-4 w-4"
                  />
                  Excited
                </div>
              </SelectItem>
              <SelectItem value={EmotionalTone.surprised}>
                <div className="flex items-center gap-2">
                  <img 
                    src={emotionIcons[EmotionalTone.surprised]} 
                    alt="Surprised" 
                    className="h-4 w-4"
                  />
                  Surprised
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Choose the emotional expression for your character
          </p>
        </div>

        {/* Narration Toggle */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="narration-toggle" className="flex items-center gap-2">
              <img 
                src="/assets/generated/microphone-icon-transparent.dim_32x32.png" 
                alt="Narration" 
                className="h-4 w-4"
              />
              AI Voice Narration
            </Label>
            <Switch
              id="narration-toggle"
              checked={audioSettings.includeNarration}
              onCheckedChange={handleNarrationToggle}
            />
          </div>
          {audioSettings.includeNarration && (
            <div className="space-y-2 pl-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Volume</span>
                <span className="font-medium">{Number(audioSettings.narrationVolume)}%</span>
              </div>
              <Slider
                value={[Number(audioSettings.narrationVolume)]}
                onValueChange={handleNarrationVolumeChange}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Automatically generated voice describing the scene
          </p>
        </div>

        {/* Sound Effects Toggle */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="sound-effects-toggle" className="flex items-center gap-2">
              <img 
                src="/assets/generated/speaker-icon-transparent.dim_32x32.png" 
                alt="Sound Effects" 
                className="h-4 w-4"
              />
              Background Sound Effects
            </Label>
            <Switch
              id="sound-effects-toggle"
              checked={audioSettings.includeSoundEffects}
              onCheckedChange={handleSoundEffectsToggle}
            />
          </div>
          {audioSettings.includeSoundEffects && (
            <div className="space-y-2 pl-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Volume</span>
                <span className="font-medium">{Number(audioSettings.soundEffectsVolume)}%</span>
              </div>
              <Slider
                value={[Number(audioSettings.soundEffectsVolume)]}
                onValueChange={handleSoundEffectsVolumeChange}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Ambient sounds matching your scene environment
          </p>
        </div>

        {/* Audio Preview Info */}
        <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
          <div className="flex items-start gap-2">
            <Volume2 className="mt-0.5 h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
            <div className="text-xs">
              <p className="font-medium text-purple-900 dark:text-purple-100">
                Audio will be synchronized with your video
              </p>
              <p className="mt-1 text-purple-700 dark:text-purple-300">
                Narration and sound effects are generated based on your prompt and scene
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
