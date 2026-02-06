import { useState } from 'react';
import PromptInput from './PromptInput';
import CharacterCustomizer from './CharacterCustomizer';
import SceneCustomizer from './SceneCustomizer';
import AnimationPreview from './AnimationPreview';
import AudioControlPanel from './AudioControlPanel';
import { CharacterType, Environment, EmotionalTone } from '@/backend';
import type { AnimationData, AudioSettings } from '@/backend';
import { useGenerateAIAnimation } from '@/hooks/useQueries';
import { toast } from 'sonner';

export default function GeneratorSection() {
  const [prompt, setPrompt] = useState('');
  const [characterType, setCharacterType] = useState<CharacterType>(CharacterType.animal);
  const [color, setColor] = useState('#3b82f6');
  const [props, setProps] = useState<string[]>([]);
  const [accessories, setAccessories] = useState<string[]>([]);
  const [emotionalTone, setEmotionalTone] = useState<EmotionalTone>(EmotionalTone.happy);
  const [environment, setEnvironment] = useState<Environment>(Environment.space);
  const [backgroundElements, setBackgroundElements] = useState<string[]>([]);
  const [audioSettings, setAudioSettings] = useState<AudioSettings>({
    includeNarration: true,
    includeSoundEffects: true,
    narrationVolume: BigInt(75),
    soundEffectsVolume: BigInt(75),
  });
  const [currentAnimation, setCurrentAnimation] = useState<AnimationData | null>(null);

  const generateAIMutation = useGenerateAIAnimation();

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
  };

  const handleAIGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt first');
      return;
    }

    try {
      const animation = await generateAIMutation.mutateAsync({
        prompt,
        emotionalTone,
        audioSettings,
      });
      setCurrentAnimation(animation);
      toast.success('AI animation generated successfully!');
    } catch (error) {
      toast.error('Failed to generate AI animation');
      console.error('AI generation error:', error);
    }
  };

  const handleManualGenerate = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt first');
      return;
    }
    toast.success('Manual customization mode activated!');
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Create Your Animation</h2>
        <p className="text-muted-foreground">
          Describe your vision and let AI bring it to life in 3D with voice and emotion
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <PromptInput
            prompt={prompt}
            onPromptChange={handlePromptChange}
            onGenerateAI={handleAIGenerate}
            onGenerateManual={handleManualGenerate}
            isGeneratingAI={generateAIMutation.isPending}
          />
          <AudioControlPanel
            audioSettings={audioSettings}
            emotionalTone={emotionalTone}
            onAudioSettingsChange={setAudioSettings}
            onEmotionalToneChange={setEmotionalTone}
          />
          <CharacterCustomizer
            characterType={characterType}
            color={color}
            props={props}
            accessories={accessories}
            emotionalTone={emotionalTone}
            onCharacterTypeChange={setCharacterType}
            onColorChange={setColor}
            onPropsChange={setProps}
            onAccessoriesChange={setAccessories}
            onEmotionalToneChange={setEmotionalTone}
          />
          <SceneCustomizer 
            environment={environment} 
            backgroundElements={backgroundElements}
            onEnvironmentChange={setEnvironment}
            onBackgroundElementsChange={setBackgroundElements}
          />
        </div>

        <div>
          <AnimationPreview
            prompt={prompt}
            characterType={characterType}
            color={color}
            environment={environment}
            emotionalTone={emotionalTone}
            animationData={currentAnimation}
          />
        </div>
      </div>
    </section>
  );
}
