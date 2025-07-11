import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InstitutionHebrewNameStepProps {
  value: string;
  onContinue: (value: string) => void;
}

export default function InstitutionHebrewNameStep({ value, onContinue }: InstitutionHebrewNameStepProps) {
  const [hebrewName, setHebrewName] = useState(value);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hebrewName.trim()) {
      setError('Hebrew name is required');
      return;
    }
    onContinue(hebrewName.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">What's your institution's Hebrew name?</h1>
        <p className="text-muted-foreground">
          This will be used for Hebrew language interfaces and documents.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hebrewName">Hebrew Name</Label>
        <Input
          id="hebrewName"
          placeholder="Enter Hebrew name"
          value={hebrewName}
          onChange={(e) => {
            setHebrewName(e.target.value);
            setError('');
          }}
          className={error ? 'border-red-500' : ''}
          dir="rtl"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  );
} 