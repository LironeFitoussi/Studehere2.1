import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, ArrowRight } from 'lucide-react';

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.96
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
      opacity: { duration: 0.15 },
      scale: { duration: 0.2 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
      opacity: { duration: 0.15 },
      scale: { duration: 0.2 }
    }
  })
};

interface FormData {
  name: string;
  hebrew_name: string;
  institution_type: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip?: string;
  };
}

const initialFormData: FormData = {
  name: '',
  hebrew_name: '',
  institution_type: 'OTHER',
  address: {
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  }
};

export default function CreateInstitutionRoute() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const updateStep = (newStep: number) => {
    setDirection(newStep > step ? 1 : -1);
    setStep(newStep);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // TODO: Implement actual institution creation when backend is ready
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Institution created successfully!');
      navigate('/getting-started/create-institution/add-buildings');
    } catch {
      toast.error('Failed to create institution');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Institution Name
              </CardTitle>
              <CardDescription>
                What is the name of your institution?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Institution Name</Label>
                <Input
                  id="name"
                  placeholder="Enter institution name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <Button
                onClick={() => updateStep(1)}
                disabled={!formData.name.trim()}
                className="w-full"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        );
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Hebrew Name</CardTitle>
              <CardDescription>
                What is the Hebrew name of your institution?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="hebrew_name">Hebrew Name</Label>
                <Input
                  id="hebrew_name"
                  placeholder="Enter Hebrew name"
                  value={formData.hebrew_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, hebrew_name: e.target.value }))}
                />
              </div>
              <Button
                onClick={() => updateStep(2)}
                disabled={!formData.hebrew_name.trim()}
                className="w-full"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Institution Type</CardTitle>
              <CardDescription>
                What type of institution is this?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="institution_type">Institution Type</Label>
                <Select
                  value={formData.institution_type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, institution_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select institution type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SCHOOL">School</SelectItem>
                    <SelectItem value="UNIVERSITY">University</SelectItem>
                    <SelectItem value="COLLEGE">College</SelectItem>
                    <SelectItem value="TRAINING_CENTER">Training Center</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => updateStep(3)}
                className="w-full"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
              <CardDescription>
                Where is your institution located?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  placeholder="Enter street address"
                  value={formData.address.street}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    address: { ...prev.address, street: e.target.value }
                  }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, city: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="State"
                    value={formData.address.state}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, state: e.target.value }
                    }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Country"
                    value={formData.address.country}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, country: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    placeholder="ZIP Code"
                    value={formData.address.zip}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      address: { ...prev.address, zip: e.target.value }
                    }))}
                  />
                </div>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={submitting || !formData.address.street.trim() || !formData.address.city.trim()}
                className="w-full"
              >
                {submitting ? 'Creating Institution...' : 'Create Institution'}
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="min-h-screen relative flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative w-full"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 