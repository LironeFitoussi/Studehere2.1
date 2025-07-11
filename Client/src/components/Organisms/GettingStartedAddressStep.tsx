import GoogleAddressLookup from '@/components/Molecules/GoogleAddressLookup';
import { Loader2 } from 'lucide-react';

interface AddressDetails {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  lat: number;
  lng: number;
  formatted_address: string;
  hebrew_address: string;
}

interface Props {
  value?: AddressDetails;
  onContinue: (addressDetails: AddressDetails) => void;
  submitting: boolean;
}

export default function GettingStartedAddressStep({ value, onContinue, submitting }: Props) {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Getting Started</h1>
      <div className="mb-6 text-lg text-muted-foreground text-center min-h-[48px] flex items-center justify-center">
        What is your address?
      </div>
      <div className="w-full mb-4">
        <GoogleAddressLookup
          value={value?.formatted_address || ''}
          onAddressSelect={async (address) => {
            function getComponent(type: string) {
              return address.address_components?.find((c) => c.types.includes(type))?.long_name || '';
            }
            const street = [getComponent('route'), getComponent('street_number')].filter(Boolean).reverse().join(' ');
            const city = getComponent('locality') || getComponent('administrative_area_level_2');
            const state = getComponent('administrative_area_level_1');
            const country = getComponent('country');
            const zip = getComponent('postal_code');
            const lat = address.lat;
            const lng = address.lng;
            const formatted_address = address.formatted_address;

            // Fetch Hebrew address
            let hebrew_address = '';
            try {
              const res = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?place_id=${address.place_id}&key=${import.meta.env.VITE_GOOGLE_API_KEY}&language=iw`
              );
              const data = await res.json();
              hebrew_address = data.results?.[0]?.formatted_address || '';
            } catch {
              hebrew_address = '';
            }

            const addressDetails: AddressDetails = {
              street,
              city,
              state,
              country,
              zip,
              lat,
              lng,
              formatted_address,
              hebrew_address,
            };
            onContinue(addressDetails);
          }}
          placeholder="Search for your address..."
        />
      </div>
      {submitting && <Loader2 className="h-6 w-6 animate-spin text-gray-400 mt-4" />}
    </div>
  );
} 