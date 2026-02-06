import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Environment } from '@/backend';
import { Mountain } from 'lucide-react';

interface SceneCustomizerProps {
  environment: Environment;
  backgroundElements: string[];
  onEnvironmentChange: (environment: Environment) => void;
  onBackgroundElementsChange: (elements: string[]) => void;
}

const availableBackgroundElements = ['Stars', 'Clouds', 'Trees', 'Buildings', 'Mountains'];

const environmentImages: Record<Environment, string> = {
  [Environment.space]: '/assets/generated/space-background.dim_600x400.png',
  [Environment.forest]: '/assets/generated/forest-background.dim_600x400.png',
  [Environment.city]: '/assets/generated/city-background.dim_600x400.png',
  [Environment.underwater]: '/assets/generated/space-background.dim_600x400.png',
  [Environment.desert]: '/assets/generated/space-background.dim_600x400.png',
};

const environmentSoundDescriptions: Record<Environment, string> = {
  [Environment.space]: 'Ambient space hum, cosmic sounds',
  [Environment.forest]: 'Birds chirping, rustling leaves',
  [Environment.city]: 'Urban ambience, traffic sounds',
  [Environment.underwater]: 'Bubbling water, ocean sounds',
  [Environment.desert]: 'Wind, distant echoes',
};

export default function SceneCustomizer({
  environment,
  backgroundElements,
  onEnvironmentChange,
  onBackgroundElementsChange,
}: SceneCustomizerProps) {
  const toggleBackgroundElement = (element: string) => {
    if (backgroundElements.includes(element)) {
      onBackgroundElementsChange(backgroundElements.filter((e) => e !== element));
    } else {
      onBackgroundElementsChange([...backgroundElements, element]);
    }
  };

  return (
    <Card className="border-purple-200/50 bg-white/80 backdrop-blur-sm dark:border-purple-800/50 dark:bg-gray-900/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Mountain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Scene Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Environment</Label>
          <Select
            value={environment}
            onValueChange={(value) => onEnvironmentChange(value as Environment)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Environment.space}>Space</SelectItem>
              <SelectItem value={Environment.forest}>Forest</SelectItem>
              <SelectItem value={Environment.city}>City</SelectItem>
              <SelectItem value={Environment.underwater}>Underwater</SelectItem>
              <SelectItem value={Environment.desert}>Desert</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <img 
              src="/assets/generated/speaker-icon-transparent.dim_32x32.png" 
              alt="Sound" 
              className="h-3 w-3"
            />
            {environmentSoundDescriptions[environment]}
          </p>
        </div>

        <div className="space-y-2">
          <Label>Environment Preview</Label>
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-purple-200/50 dark:border-purple-800/50">
            <img
              src={environmentImages[environment]}
              alt={`${environment} environment`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Background Elements</Label>
          <div className="space-y-2">
            {availableBackgroundElements.map((element) => (
              <div key={element} className="flex items-center space-x-2">
                <Checkbox
                  id={`bg-${element}`}
                  checked={backgroundElements.includes(element)}
                  onCheckedChange={() => toggleBackgroundElement(element)}
                />
                <label
                  htmlFor={`bg-${element}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {element}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
