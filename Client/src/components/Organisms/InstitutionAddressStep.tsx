import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InstitutionAddressLookup from '@/components/Molecules/InstitutionAddressLookup';

interface AddressFormData {
  street: string;
  city: string;
  state: string;
  country: string;
  zip?: string;
  lat?: number;
  lng?: number;
  formatted_address?: string;
  hebrew_address?: string;
}

interface InstitutionAddressStepProps {
  value: AddressFormData;
  onContinue: (address: AddressFormData) => void;
  submitting?: boolean;
}

export default function InstitutionAddressStep({ 
  value, 
  onContinue,
  submitting = false 
}: InstitutionAddressStepProps) {
  const [address, setAddress] = useState<AddressFormData>(value);
  const [errors, setErrors] = useState<Partial<Record<keyof AddressFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof AddressFormData, string>> = {};
    
    if (!address.street?.trim()) newErrors.street = 'Street is required';
    if (!address.city?.trim()) newErrors.city = 'City is required';
    if (!address.state?.trim()) newErrors.state = 'State is required';
    if (!address.country?.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onContinue(address);
    }
  };

  const handleInputChange = (field: keyof AddressFormData, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddressSelect = (selectedAddress: AddressFormData) => {
    setAddress(selectedAddress);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">What's your institution's address?</h1>
        <p className="text-muted-foreground">
          This address will be used for official communications and student information.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Search Address</Label>
          <InstitutionAddressLookup
            value={address.formatted_address}
            onAddressSelect={handleAddressSelect}
            className="mb-6"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            placeholder="Enter street address"
            value={address.street}
            onChange={(e) => handleInputChange('street', e.target.value)}
            className={errors.street ? 'border-red-500' : ''}
          />
          {errors.street && <p className="text-sm text-red-500">{errors.street}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Enter city"
              value={address.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={errors.city ? 'border-red-500' : ''}
            />
            {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              placeholder="Enter state"
              value={address.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={errors.state ? 'border-red-500' : ''}
            />
            {errors.state && <p className="text-sm text-red-500">{errors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              placeholder="Enter country"
              value={address.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              className={errors.country ? 'border-red-500' : ''}
            />
            {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              id="zip"
              placeholder="Enter ZIP code"
              value={address.zip || ''}
              onChange={(e) => handleInputChange('zip', e.target.value)}
              className={errors.zip ? 'border-red-500' : ''}
            />
            {errors.zip && <p className="text-sm text-red-500">{errors.zip}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hebrewAddress">Hebrew Address (Optional)</Label>
          <Input
            id="hebrewAddress"
            placeholder="Enter Hebrew address"
            value={address.hebrew_address || ''}
            onChange={(e) => handleInputChange('hebrew_address', e.target.value)}
            dir="rtl"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Creating Institution...' : 'Create Institution'}
      </Button>
    </form>
  );
} 