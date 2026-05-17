import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api/api';

const Section = styled.section`
  padding: 100px 0;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 32px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;

  &::after {
    content: '';
    display: block;
    height: 1px;
    width: 300px;
    background-color: ${({ theme }) => theme.secondary};
    margin-left: 20px;
    opacity: 0.3;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TextContent = styled(motion.div)`
  p {
    margin-bottom: 20px;
    font-size: 18px;
    color: ${({ theme }) => theme.secondary};
  }
`;

const EducationBox = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  padding: 30px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);

  h3 {
    color: ${({ theme }) => theme.primary};
  }
`;

const About = () => {
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: fetchProfile });

  if (!profile) return null;

  return (
    <Section id="about">
      <SectionTitle
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </SectionTitle>

      <Content>
        <TextContent
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <p>{profile.about}</p>
        </TextContent>

        <EducationBox
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h3>Education</h3>
          {profile.education.map((edu, index) => (
            <div key={index} style={{ marginTop: '20px' }}>
              <h4>{edu.institution}</h4>
              <p style={{ color: 'var(--secondary)' }}>{edu.degree}</p>
              <p style={{ fontSize: '14px', marginTop: '10px' }}>{edu.period}</p>
            </div>
          ))}
        </EducationBox>
      </Content>
    </Section>
  );
};

export default About;
