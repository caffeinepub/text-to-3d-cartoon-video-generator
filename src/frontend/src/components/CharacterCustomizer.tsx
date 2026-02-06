import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CharacterType, EmotionalTone } from '@/backend';
import { Palette } from 'lucide-react';

interface CharacterCustomizerProps {
  characterType: CharacterType;
  color: string;
  props: string[];
  accessories: string[];
  emotionalTone: EmotionalTone;
  onCharacterTypeChange: (type: CharacterType) => void;
  onColorChange: (color: string) => void;
  onPropsChange: (props: string[]) => void;
  onAccessoriesChange: (accessories: string[]) => void;
  onEmotionalToneChange: (tone: EmotionalTone) => void;
}

const availableProps = ['Hat', 'Glasses', 'Scarf', 'Cape', 'Crown'];
const availableAccessories = ['Wand', 'Sword', 'Shield', 'Backpack', 'Wings'];

export default function CharacterCustomizer({
  characterType,
  color,
  props,
  accessories,
  emotionalTone,
  onCharacterTypeChange,
  onColorChange,
  onPropsChange,
  onAccessoriesChange,
  onEmotionalToneChange,
}: CharacterCustomizerProps) {
  const toggleProp = (prop: string) => {
    if (props.includes(prop)) {
      onPropsChange(props.filter((p) => p !== prop));
    } else {
      onPropsChange([...props, prop]);
    }
  };

  const toggleAccessory = (accessory: string) => {
    if (accessories.includes(accessory)) {
      onAccessoriesChange(accessories.filter((a) => a !== accessory));
    } else {
      onAccessoriesChange([...accessories, accessory]);
    }
  };

  return (
    <Card className="border-purple-200/50 bg-white/80 backdrop-blur-sm dark:border-purple-800/50 dark:bg-gray-900/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Character Customization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Character Type</Label>
          <Select
            value={characterType}
            onValueChange={(value) => onCharacterTypeChange(value as CharacterType)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={CharacterType.animal}>Animal</SelectItem>
              <SelectItem value={CharacterType.human}>Human</SelectItem>
              <SelectItem value={CharacterType.fantasyCreature}>Fantasy Creature</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Primary Color</Label>
          <div className="flex gap-2">
            <Input
              type="color"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="h-10 w-20 cursor-pointer"
            />
            <Input
              type="text"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="flex-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Props</Label>
          <div className="space-y-2">
            {availableProps.map((prop) => (
              <div key={prop} className="flex items-center space-x-2">
                <Checkbox
                  id={`prop-${prop}`}
                  checked={props.includes(prop)}
                  onCheckedChange={() => toggleProp(prop)}
                />
                <label
                  htmlFor={`prop-${prop}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {prop}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Accessories</Label>
          <div className="space-y-2">
            {availableAccessories.map((accessory) => (
              <div key={accessory} className="flex items-center space-x-2">
                <Checkbox
                  id={`accessory-${accessory}`}
                  checked={accessories.includes(accessory)}
                  onCheckedChange={() => toggleAccessory(accessory)}
                />
                <label
                  htmlFor={`accessory-${accessory}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {accessory}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
