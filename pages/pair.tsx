import KamNavBar from '../components/NaviBar';
import { Footer } from '../components/Footer';
import { 
  Text, 
  Button, 
  VStack,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  HStack
} from '@chakra-ui/react';

// Authentication Imports
import type { InferGetServerSidePropsType } from 'next';
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { PinInput, PinInputField } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FiMonitor, FiCheck } from 'react-icons/fi';
import { useState } from 'react';
import { PairingWizard, Step } from '../components/PairingWizard';

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  var localplayer:any;
  if (!session) {
    console.log('No session');
    return {
      redirect: {
        destination: "/auth/signin", // Redirect to sign-in page
        permanent: false,
      },
    };
  }
   console.log('session is',session)
        localplayer = session;
      return {
          props: {
            user: localplayer.user,
            userid: localplayer.id,
            isAuthenticated: localplayer.isAuthenticated,
            stripeid: localplayer.stripeid,
            credits: localplayer.credits,
          },
        }
}

export default function PairDevice({
  user, 
  userid, 
  isAuthenticated, 
  stripeid, 
  credits
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  // State management (moved from getServerSideProps to component)
  const [step, setStep] = useState('enter-code');
  const [pairingCode, setPairingCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const toast = useToast();

  const handlePairing = async () => {
    if (pairingCode.length !== 4) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/pairing/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pairingCode,
          deviceName: `Game Client ${new Date().toLocaleDateString()}`
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Pairing failed');
      }

      // Success!
      setStep('success');
      toast({
        title: "Device Paired Successfully!",
        description: "Your game client is now linked to your account.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Pairing Failed",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setStep('enter-code');
    setPairingCode('');
    setError(null);
  };

  return (
    <>
<KamNavBar currentPage="Pairing"></KamNavBar>
      
      <PairingWizard>
        {step === 'enter-code' && (
          <Step title="Pair Your Game Client">
            <VStack spacing={6}>
              <Icon as={FiMonitor} boxSize="4rem" color="blue.500" />
              <Text textAlign="center" fontSize="lg">
                Enter the 4-digit code shown in your game:
              </Text>
              
              {error && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <HStack spacing={4}>
              <PinInput 
                size="lg" 
                value={pairingCode}
                onChange={setPairingCode}
                isDisabled={isLoading}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
                </HStack>
              
              <VStack spacing={3}>
                <Button 
                  onClick={handlePairing} 
                  isDisabled={pairingCode.length !== 4 || isLoading}
                  colorScheme="blue"
                  size="lg"
                  minW="200px"
                >
                  {isLoading ? <Spinner size="sm" /> : 'Pair Device'}
                </Button>
                
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  Code expires in 5 minutes
                </Text>
              </VStack>
            </VStack>
          </Step>
        )}
        
        {step === 'success' && (
          <Step title="Device Paired Successfully!">
            <VStack spacing={6}>
              <Icon as={FiCheck} boxSize="4rem" color="green.500" />
              <Text textAlign="center" fontSize="lg">
                Your game client is now linked to your account.
              </Text>
              <Text fontSize="md" color="gray.600" textAlign="center">
                You can close this window and return to your game.
                Purchases will now work seamlessly in-game.
              </Text>
              
              <VStack spacing={3}>
                <Button 
                  colorScheme="green" 
                  size="lg"
                  onClick={() => window.close()}
                >
                  Close Window
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleRetry}
                >
                  Pair Another Device
                </Button>
              </VStack>
            </VStack>
          </Step>
        )}
      </PairingWizard>
      
      <Footer />
    </>
  );
}