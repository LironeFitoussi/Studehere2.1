import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Props {
  value: string;
  onContinue: (value: string) => void;
  submitting: boolean;
}

export default function GettingStartedNameStep({ value, onContinue, submitting }: Props) {
  const [input, setInput] = useState(value);
  useEffect(() => { setInput(value); }, [value]);
  return (
    <form
      className="w-full flex flex-col items-center"
      onSubmit={e => {
        e.preventDefault();
        if (input.trim()) onContinue(input.trim());
      }}
      autoComplete="off"
    >
      <h1 className="text-2xl font-bold mb-6">Getting Started</h1>
      <div className="mb-6 text-lg text-muted-foreground text-center min-h-[48px] flex items-center justify-center">
        Please tell us your first name.
      </div>
      <input
        className="text-lg border rounded px-4 py-2 w-full mb-4"
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        required
        autoFocus
        placeholder="First Name"
      />
      <Button type="submit" className="w-16 h-12 mt-2" disabled={submitting}>
        {submitting ? '...' : 'Continue'}
      </Button>
    </form>
  );
} 