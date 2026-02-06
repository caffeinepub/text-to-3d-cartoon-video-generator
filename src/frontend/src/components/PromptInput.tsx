import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Wand2, Zap } from 'lucide-react';
import { toast } from 'sonner';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerateManual: () => void;
  onGenerateAI: () => void;
  isGeneratingAI?: boolean;
}

const examplePrompts = [
  'a cat dancing in space',
  'a robot playing guitar in the forest',
  'a dragon flying over a city',
  'a unicorn swimming underwater',
];

export default function PromptInput({ 
  prompt, 
  onPromptChange, 
  onGenerateManual, 
  onGenerateAI,
  isGeneratingAI = false 
}: PromptInputProps) {
  const handleGenerateManual = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt first!');
      return;
    }
    onGenerateManual();
  };

  const handleGenerateAI = () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt first!');
      return;
    }
    onGenerateAI();
  };

  return (
    <Card className="border-purple-200/50 bg-white/80 backdrop-blur-sm dark:border-purple-800/50 dark:bg-gray-900/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Describe Your Animation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="e.g., a cat dancing in space with stars and planets..."
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          className="min-h-[120px] resize-none"
        />
        
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => onPromptChange(example)}
                className="rounded-full bg-purple-100 px-3 py-1 text-xs text-purple-700 transition-colors hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:hover:bg-purple-900"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Button
            onClick={handleGenerateAI}
            disabled={isGeneratingAI}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600"
            size="lg"
          >
            {isGeneratingAI ? (
              <>
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Generating with AI...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Generate 3D Video (AI)
              </>
            )}
          </Button>

          <Button
            onClick={handleGenerateManual}
            variant="outline"
            className="w-full border-purple-300 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-950"
            size="lg"
          >
            <Wand2 className="mr-2 h-5 w-5" />
            Customize & Generate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

