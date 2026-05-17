import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api/api';
import { FiGithub, FiMail, FiPhone } from 'react-icons/fi';

const Section = styled.section`
  padding: 100px 0 50px 0;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 40px;
  margin-bottom: 20px;
`;

const SubText = styled(motion.p)`
  color: ${({ theme }) => theme.secondary};
  font-size: 18px;
  margin-bottom: 50px;
`;

const ContactButton = styled(motion.a)`
  display: inline-block;
  padding: 15px 30px;
  background-color: transparent;
  color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
  
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${({ theme }) => theme.secondary};
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 10px 15px;
    border-radius: 8px;
    background: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    
    &:hover {
      color: ${({ theme }) => theme.primary};
      border-color: ${({ theme }) => theme.primary};
      transform: translateY(-3px);
    }

    svg {
      font-size: 20px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

const Footer = styled.footer`
  margin-top: 80px;
  padding: 20px 0;
  font-family: monospace;
  font-size: 14px;
  color: ${({ theme }) => theme.secondary};
  text-align: center;
`;

const Contact = () => {
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: fetchProfile });

  if (!profile) return null;

  return (
    <Section id="contact">
      <SectionTitle
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        Get In Touch
      </SectionTitle>

      <SubText
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </SubText>

      <ContactButton
        href={`mailto:${profile.email}`}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Say Hello
      </ContactButton>

      <SocialLinks
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <a href={`tel:${profile.phone}`}>
          <FiPhone /> {profile.phone}
        </a>
        <a href={`mailto:${profile.email}`}>
          <FiMail /> Email Me
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          <FiGithub /> GitHub
        </a>
      </SocialLinks>
    </Section>
  );
};

export default Contact;
