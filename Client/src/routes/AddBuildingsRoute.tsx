import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Plus, X, ArrowRight } from 'lucide-react';

interface Building {
  id: string;
  name: string;
  hebrew_name: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zip?: string;
  };
}

export default function AddBuildingsRoute() {
  const navigate = useNavigate();
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [currentBuilding, setCurrentBuilding] = useState<Partial<Building>>({
    name: '',
    hebrew_name: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zip: '',
    }
  });
  const [submitting, setSubmitting] = useState(false);

  const addBuilding = () => {
    if (!currentBuilding.name?.trim() || !currentBuilding.hebrew_name?.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newBuilding: Building = {
      id: Date.now().toString(),
      name: currentBuilding.name,
      hebrew_name: currentBuilding.hebrew_name,
      address: {
        street: currentBuilding.address?.street || '',
        city: currentBuilding.address?.city || '',
        state: currentBuilding.address?.state || '',
        country: currentBuilding.address?.country || '',
        zip: currentBuilding.address?.zip || '',
      }
    };

    setBuildings(prev => [...prev, newBuilding]);
    setCurrentBuilding({
      name: '',
      hebrew_name: '',
      address: {
        street: '',
        city: '',
        state: '',
        country: '',
        zip: '',
      }
    });
    toast.success('Building added successfully!');
  };

  const removeBuilding = (id: string) => {
    setBuildings(prev => prev.filter(building => building.id !== id));
  };

  const handleSubmit = async () => {
    if (buildings.length === 0) {
      toast.error('Please add at least one building');
      return;
    }

    setSubmitting(true);
    try {
      // TODO: Implement actual building creation when backend is ready
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success('Buildings added successfully!');
      navigate('/dashboard');
    } catch {
      toast.error('Failed to add buildings');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="min-h-screen relative flex items-center justify-center p-4">
        <div className="w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Add Buildings
                </CardTitle>
                <CardDescription>
                  Add buildings to your institution. You can add multiple buildings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Building Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter building name"
                      value={currentBuilding.name || ''}
                      onChange={(e) => setCurrentBuilding(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hebrew_name">Hebrew Name</Label>
                    <Input
                      id="hebrew_name"
                      placeholder="Enter Hebrew name"
                      value={currentBuilding.hebrew_name || ''}
                      onChange={(e) => setCurrentBuilding(prev => ({ ...prev, hebrew_name: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    placeholder="Enter street address"
                    value={currentBuilding.address?.street || ''}
                    onChange={(e) => setCurrentBuilding(prev => ({ 
                      ...prev, 
                      address: { 
                        street: e.target.value,
                        city: prev.address?.city || '',
                        state: prev.address?.state || '',
                        country: prev.address?.country || '',
                        zip: prev.address?.zip || ''
                      }
                    }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      value={currentBuilding.address?.city || ''}
                      onChange={(e) => setCurrentBuilding(prev => ({ 
                        ...prev, 
                        address: { 
                          street: prev.address?.street || '',
                          city: e.target.value,
                          state: prev.address?.state || '',
                          country: prev.address?.country || '',
                          zip: prev.address?.zip || ''
                        }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="State"
                      value={currentBuilding.address?.state || ''}
                      onChange={(e) => setCurrentBuilding(prev => ({ 
                        ...prev, 
                        address: { 
                          street: prev.address?.street || '',
                          city: prev.address?.city || '',
                          state: e.target.value,
                          country: prev.address?.country || '',
                          zip: prev.address?.zip || ''
                        }
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
                      value={currentBuilding.address?.country || ''}
                      onChange={(e) => setCurrentBuilding(prev => ({ 
                        ...prev, 
                        address: { 
                          street: prev.address?.street || '',
                          city: prev.address?.city || '',
                          state: prev.address?.state || '',
                          country: e.target.value,
                          zip: prev.address?.zip || ''
                        }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      placeholder="ZIP Code"
                      value={currentBuilding.address?.zip || ''}
                      onChange={(e) => setCurrentBuilding(prev => ({ 
                        ...prev, 
                        address: { 
                          street: prev.address?.street || '',
                          city: prev.address?.city || '',
                          state: prev.address?.state || '',
                          country: prev.address?.country || '',
                          zip: e.target.value
                        }
                      }))}
                    />
                  </div>
                </div>
                <Button
                  onClick={addBuilding}
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Building
                </Button>
              </CardContent>
            </Card>

            {buildings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Added Buildings</CardTitle>
                  <CardDescription>
                    Buildings that will be added to your institution
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {buildings.map((building) => (
                    <div key={building.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{building.name}</h3>
                          <Badge variant="secondary">{building.hebrew_name}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {building.address.street}, {building.address.city}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBuilding(building.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/getting-started/create-institution')}
                    className="flex-1"
                  >
                    Back to Institution Setup
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={submitting || buildings.length === 0}
                    className="flex-1"
                  >
                    {submitting ? 'Setting up...' : 'Complete Setup'}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                {buildings.length === 0 && (
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Add at least one building to continue
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 