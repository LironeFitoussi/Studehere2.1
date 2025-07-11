import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InstitutionNameStepProps {
  value: string;
  onContinue: (value: string) => void;
}

export default function InstitutionNameStep({ value, onContinue }: InstitutionNameStepProps) {
  const [name, setName] = useState(value);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Institution name is required');
      return;
    }
    onContinue(name.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">What's your institution's name?</h1>
        <p className="text-muted-foreground">
          This is the name that will be displayed to students and instructors.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="institutionName">Institution Name</Label>
        <Input
          id="institutionName"
          placeholder="Enter institution name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
          className={error ? 'border-red-500' : ''}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  );
} 