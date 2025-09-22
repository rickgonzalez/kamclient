// components/PairingWizard.tsx
import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  VStack, 
  useColorModeValue 
} from '@chakra-ui/react';

interface StepProps {
  title: string;
  children: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({ title, children }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={8}
      shadow="md"
      maxW="md"
      w="full"
    >
      <VStack spacing={6}>
        <Heading size="lg" textAlign="center" color="blue.500">
          {title}
        </Heading>
        {children}
      </VStack>
    </Box>
  );
};

interface PairingWizardProps {
  children: React.ReactNode;
}

export const PairingWizard: React.FC<PairingWizardProps> = ({ children }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box minH="100vh" bg={bgColor} py={12}>
      <Container maxW="container.sm">
        <VStack spacing={8} align="center">
          <Heading size="xl" textAlign="center">
            Device Pairing
          </Heading>
          {children}
        </VStack>
      </Container>
    </Box>
  );
};
