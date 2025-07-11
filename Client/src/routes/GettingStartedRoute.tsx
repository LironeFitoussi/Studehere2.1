import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { useAppDispatch } from '@/store/hooks';
import { updateUser, updateUserAddress, type AddressDetails } from '@/api/userService';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Building2, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GettingStartedNameStep from '@/components/Organisms/GettingStartedNameStep';
import GettingStartedLastNameStep from '@/components/Organisms/GettingStartedLastNameStep';
import GettingStartedPhoneStep from '@/components/Organisms/GettingStartedPhoneStep';
import GettingStartedAddressStep from '@/components/Organisms/GettingStartedAddressStep';
import { fetchUserByEmail } from '@/store/slices/userSlice';

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  id: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  addressDetails?: AddressDetails;
}

const pageTransition = {
  initial: { opacity: 0, x: 0, scale: 0.96 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }},
  exit: { opacity: 0, x: 0, scale: 0.96, transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
};

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

export default function GettingStartedRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = searchParams.get('currentStep');
  const { isLoading: isAuthLoading, user: auth0User } = useAuth();
  const { user, isLoading: isUserLoading } = useUser();
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<FormData>(() => ({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    id: user?._id || '',
    address: user?.address || '',
    addressDetails: undefined,
  }));

  const [step, setStep] = useState(currentStep ? parseInt(currentStep) : 0);
  const [direction, setDirection] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(currentStep === 'choose-path');

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        id: user._id || '',
      }));
    }
  }, [user]);

  if (isAuthLoading || isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  const updateStep = (newStep: number) => {
    setDirection(1);
    setStep(newStep);
    setSearchParams({ currentStep: newStep.toString() });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <GettingStartedNameStep
            value={formData.firstName || ''}
            onContinue={async (value: string) => {
              setSubmitting(true);
              try {
                await updateUser(formData.id, { firstName: value });
                setFormData((prev) => ({ ...prev, firstName: value }));
                updateStep(1);
              } catch {
                toast.error('Failed to update first name');
              } finally {
                setSubmitting(false);
              }
            }}
            submitting={submitting}
          />
        );
      case 1:
        return (
          <GettingStartedLastNameStep
            value={formData.lastName || ''}
            onContinue={async (value: string) => {
              setSubmitting(true);
              try {
                await updateUser(formData.id, { lastName: value });
                setFormData((prev) => ({ ...prev, lastName: value }));
                updateStep(2);
              } catch {
                toast.error('Failed to update last name');
              } finally {
                setSubmitting(false);
              }
            }}
            submitting={submitting}
          />
        );
      case 2:
        return (
          <GettingStartedPhoneStep
            value={formData.phone || ''}
            onContinue={async (value: string) => {
              setSubmitting(true);
              try {
                await updateUser(formData.id, { phone: value });
                setFormData((prev) => ({ ...prev, phone: value }));
                updateStep(3);
              } catch {
                toast.error('Failed to update phone');
              } finally {
                setSubmitting(false);
              }
            }}
            submitting={submitting}
          />
        );
      case 3:
        return (
          <GettingStartedAddressStep
            value={formData.addressDetails}
            onContinue={async (addressDetails: AddressDetails) => {
              setSubmitting(true);
              console.log('======================');
              console.log(user?._id);
              console.log(addressDetails);
              console.log('======================');
              try {
                await updateUserAddress(user!._id, addressDetails);
                // Update user role from guest to user
                await updateUser(user!._id, { role: 'user' });
                // Refresh user data
                if (auth0User?.email) {
                  await dispatch(fetchUserByEmail({ email: auth0User.email, auth0User }));
                }
                setFormData((prev) => ({ ...prev, addressDetails }));
                setCompleted(true);
                setSearchParams({ currentStep: 'choose-path' });
              } catch {
                toast.error('Failed to update profile');
              } finally {
                setSubmitting(false);
              }
            }}
            submitting={submitting}
          />
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
            {completed ? (
              <motion.div key="completion" {...pageTransition} className="text-center px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                >
                  <h1 className="text-2xl font-bold mb-4">All done! 🎉</h1>
                  <p className="mb-6">Thank you for completing your profile.</p>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center space-y-8 py-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.2 }}
                >
                  <h2 className="text-4xl font-bold">Choose your path</h2>
                  <p className="text-xl text-muted-foreground max-w-2xl text-center">
                    You can either join an existing institution or create your own.
                  </p>
                  <div className="flex gap-8 mt-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-lg px-8 py-6 flex items-center gap-3 transition-all duration-200 hover:scale-105"
                      onClick={() => navigate('/getting-started/create-institution')}
                    >
                      <Users className="h-6 w-6" />
                      Join an Institution
                    </Button>
                    <Button
                      size="lg"
                      className="text-lg px-8 py-6 flex items-center gap-3 transition-all duration-200 hover:scale-105"
                      onClick={() => navigate('/getting-started/create-institution')}
                    >
                      <Building2 className="h-6 w-6" />
                      Create an Institution
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                custom={direction}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative w-full px-6"
              >
                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-black/5 p-8 backdrop-blur-sm"
                  initial={{ boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
                  whileHover={{
                    scale: 1.005,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
                    borderColor: 'rgba(0,0,0,0.1)',
                    transition: { duration: 0.2, ease: 'easeOut' }
                  }}
                  transition={{
                    boxShadow: { duration: 0.2 },
                    borderColor: { duration: 0.2 }
                  }}
                >
                  {renderStep()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 