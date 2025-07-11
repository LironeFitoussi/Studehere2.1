import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Building2 } from "lucide-react";
import type { IAddress } from "@/types";

interface InstitutionAddressLookupProps {
  onAddressSelect: (address: IAddress) => void;
  value?: string;
  className?: string;
  placeholder?: string;
}

export default function InstitutionAddressLookup({
  onAddressSelect,
  value = "",
  className = "",
  placeholder = "Search for your institution's address...",
}: InstitutionAddressLookupProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isSelectingRef = useRef(false);
  const lastTypedValueRef = useRef("");

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .pac-container {
        z-index: 2147483647 !important;
        margin-top: 4px !important;
        border-radius: 0.5rem !important;
        border: 1px solid #e2e8f0 !important;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
        background-color: white !important;
        font-family: inherit !important;
        pointer-events: auto !important;
      }
      .pac-container::after {
        display: none !important;
      }
      .pac-item {
        padding: 0.75rem 1rem !important;
        font-size: 0.875rem !important;
        line-height: 1.25rem !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        gap: 0.5rem !important;
        border-top: 1px solid #e2e8f0 !important;
        pointer-events: auto !important;
      }
      .pac-item:first-child {
        border-top: none !important;
      }
      .pac-item:hover {
        background-color: #f8fafc !important;
      }
      .pac-item-selected {
        background-color: #f1f5f9 !important;
      }
      .pac-icon {
        display: none !important;
      }
      .pac-item-query {
        font-size: 0.875rem !important;
        line-height: 1.25rem !important;
        color: #1e293b !important;
        cursor: pointer !important;
        pointer-events: auto !important;
      }
      .pac-matched {
        font-weight: 600 !important;
      }
    `;
    document.head.appendChild(style);

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.pac-container') || target.closest('.institution-address-lookup')) {
        e.stopPropagation();
      }
    };

    document.addEventListener('click', handleDocumentClick, true);

    const loadGoogleMapsScript = () => {
      setIsLoading(true);
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initializeAutocomplete();
        geocoderRef.current = new google.maps.Geocoder();
        setIsLoading(false);
      };
      document.head.appendChild(script);
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initializeAutocomplete();
      geocoderRef.current = new google.maps.Geocoder();
    }

    return () => {
      if (autoCompleteRef.current) {
        google.maps.event.clearInstanceListeners(autoCompleteRef.current);
      }
      document.head.removeChild(style);
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, []);

  const extractAddressComponent = (
    components: google.maps.GeocoderAddressComponent[],
    type: string
  ): string => {
    const component = components.find(comp => comp.types.includes(type));
    return component ? component.long_name : '';
  };

  const getEnglishAddress = async (placeId: string): Promise<google.maps.GeocoderResult | null> => {
    if (!geocoderRef.current) return null;

    try {
      const response = await geocoderRef.current.geocode({
        placeId: placeId,
        language: 'en'
      });

      return response.results[0] || null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  const initializeAutocomplete = () => {
    if (!inputRef.current) return;

    autoCompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      types: ["address"],
      componentRestrictions: { country: "IL" },
      fields: ["address_components", "formatted_address", "geometry", "place_id"],
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    inputRef.current.addEventListener('keydown', handleKeyDown);

    autoCompleteRef.current.addListener("place_changed", async () => {
      isSelectingRef.current = true;
      const place = autoCompleteRef.current?.getPlace();

      if (place && place.place_id) {
        // Store the user's typed address (potentially Hebrew) before it gets replaced
        const hebrewAddress = lastTypedValueRef.current;

        // Get the English version of the address
        const englishResult = await getEnglishAddress(place.place_id);
        
        if (englishResult && englishResult.address_components) {
          const addressDetails: IAddress = {
            street: `${extractAddressComponent(englishResult.address_components, 'street_number')} ${extractAddressComponent(englishResult.address_components, 'route')}`.trim(),
            city: extractAddressComponent(englishResult.address_components, 'locality'),
            state: extractAddressComponent(englishResult.address_components, 'administrative_area_level_1'),
            country: extractAddressComponent(englishResult.address_components, 'country'),
            lat: englishResult.geometry?.location.lat(),
            lng: englishResult.geometry?.location.lng(),
            formatted_address: englishResult.formatted_address,
            hebrew_address: hebrewAddress
          };

          // Only add zip if it exists
          const zip = extractAddressComponent(englishResult.address_components, 'postal_code');
          if (zip) {
            addressDetails.zip = zip;
          }

          // Keep the Hebrew input visible in the search field
          setInputValue(hebrewAddress);
          if (inputRef.current) {
            inputRef.current.value = hebrewAddress;
            inputRef.current.focus();
          }

          onAddressSelect(addressDetails);
        }

        setTimeout(() => {
          isSelectingRef.current = false;
        }, 100);
      }
    });

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  };

  const handleBlur = () => {
    if (!isSelectingRef.current) {
      setTimeout(() => setIsFocused(false), 300);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    lastTypedValueRef.current = newValue;
  };

  return (
    <div className={`relative institution-address-lookup ${className}`}>
      <div className="relative">
        <Building2
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400
            ${isFocused ? "text-primary" : ""}`}
        />
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          placeholder={placeholder}
          className={`pl-9 pr-10 transition-all duration-200 ${
            isFocused ? "ring-2 ring-primary ring-offset-2" : ""
          }`}
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          </div>
        )}
      </div>
    </div>
  );
} 