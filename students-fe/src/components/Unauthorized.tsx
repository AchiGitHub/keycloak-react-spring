import React from 'react';
import {
    Button,
    Flex,
    Heading,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react';

  
  export default function ForgotPasswordForm(): JSX.Element {
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Need access?
          </Heading>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Login
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }