import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InstitutionTypeStepProps {
  value: string;
  onContinue: (value: string) => void;
}

const INSTITUTION_TYPES = [
  { value: 'UNIVERSITY', label: 'University' },
  { value: 'COLLEGE', label: 'College' },
  { value: 'HIGH_SCHOOL', label: 'High School' },
  { value: 'ELEMENTARY', label: 'Elementary School' },
  { value: 'KINDERGARTEN', label: 'Kindergarten' },
  { value: 'RELIGIOUS', label: 'Religious Institution' },
  { value: 'OTHER', label: 'Other' }
];

export default function InstitutionTypeStep({ value, onContinue }: InstitutionTypeStepProps) {
  const [type, setType] = useState(value || 'OTHER');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type) {
      setError('Please select an institution type');
      return;
    }
    onContinue(type);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">What type of institution is this?</h1>
        <p className="text-muted-foreground">
          This helps us provide the most relevant features for your institution.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="institutionType">Institution Type</Label>
        <Select
          value={type}
          onValueChange={(value) => {
            setType(value);
            setError('');
          }}
        >
          <SelectTrigger className={error ? 'border-red-500' : ''}>
            <SelectValue placeholder="Select institution type" />
          </SelectTrigger>
          <SelectContent>
            {INSTITUTION_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  );
} 