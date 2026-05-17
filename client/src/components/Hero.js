import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api/api';

const HeroSection = styled.section`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 100px 0;
`;

const Title = styled(motion.h1)`
  font-size: clamp(40px, 8vw, 80px);
  margin-bottom: 10px;
  line-height: 1.1;
  background: linear-gradient(to right, ${({ theme }) => theme.text}, ${({ theme }) => theme.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(20px, 4vw, 40px);
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 30px;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const PrimaryButton = styled.a`
  padding: 14px 28px;
  background-color: ${({ theme }) => theme.primary};
  color: #fff;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.5);
  }
`;

const SecondaryButton = styled.a`
  padding: 14px 28px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.5);
  }
`;

const Hero = () => {
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile!</div>;

  return (
    <HeroSection id="home">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p style={{ color: 'var(--primary)', marginBottom: '20px', fontSize: '18px' }}>Hi, my name is</p>
      </motion.div>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {profile?.name}
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        I am a {profile?.title}
      </Subtitle>
      <ButtonGroup
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <PrimaryButton href="#projects">Check out my projects</PrimaryButton>
        <SecondaryButton href={profile?.github} target="_blank" rel="noreferrer">GitHub</SecondaryButton>
      </ButtonGroup>
    </HeroSection>
  );
};

export default Hero;
