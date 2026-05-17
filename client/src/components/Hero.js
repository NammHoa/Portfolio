import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api/api';
import { FiGithub, FiFacebook } from 'react-icons/fi';

const HeroSection = styled.section`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 100px 0;
  gap: 80px; /* Tăng khoảng cách giữa chữ và ảnh để giao diện thoáng hơn */

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ImageContainer = styled(motion.div)`
  width: 350px; /* Tăng kích thước ảnh để cân đối với khối chữ lớn */
  height: 350px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid ${({ theme }) => theme.primary};
  box-shadow: 0 10px 40px rgba(37, 99, 235, 0.3);
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top; /* Canh lề trên để lấy trọn phần tóc và mặt, không bị méo */
  }

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
  }
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

const SocialIcons = styled(motion.div)`
  display: flex;
  gap: 25px;
  margin-top: 30px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    border: 2px solid ${({ theme }) => theme.secondary};
    font-size: 24px;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      background-color: ${({ theme }) => theme.primary};
      color: #fff;
      border-color: ${({ theme }) => theme.primary};
      box-shadow: 0 8px 25px rgba(37, 99, 235, 0.5);
    }
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
      <TextContent>
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
        <SocialIcons
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="https://www.facebook.com/namzxjee/" target="_blank" rel="noreferrer" aria-label="Facebook">
            <FiFacebook />
          </a>
          <a href={profile?.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FiGithub />
          </a>
        </SocialIcons>
      </TextContent>

      {profile?.github && (
        <ImageContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >

          <img src="/images/avatar.jpg" alt={profile?.name} />
        </ImageContainer>
      )}
    </HeroSection>
  );
};

export default Hero;
