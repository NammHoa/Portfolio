import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchExperience } from '../api/api';

const Section = styled.section`
  padding: 100px 0;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 32px;
  margin-bottom: 50px;
  display: flex;
  align-items: center;

  &::after {
    content: '';
    display: block;
    height: 1px;
    flex: 1;
    background-color: ${({ theme }) => theme.secondary};
    margin-left: 20px;
    opacity: 0.3;
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &::after {
    content: '';
    position: absolute;
    width: 2px;
    background-color: ${({ theme }) => theme.primary};
    top: 0;
    bottom: 0;
    left: 20px;
    margin-left: -1px;
  }
`;

const TimelineItem = styled(motion.div)`
  padding: 20px 40px;
  position: relative;
  background-color: inherit;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    right: auto;
    left: 12px;
    background-color: ${({ theme }) => theme.body};
    border: 4px solid ${({ theme }) => theme.primary};
    top: 24px;
    border-radius: 50%;
    z-index: 1;
  }
`;

const TimelineContent = styled.div`
  padding: 20px 30px;
  background-color: ${({ theme }) => theme.card};
  position: relative;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};

  h3 {
    margin-bottom: 5px;
    color: ${({ theme }) => theme.text};
  }
  
  h4 {
    color: ${({ theme }) => theme.primary};
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 500;
    
    a {
      color: inherit;
      text-decoration: none;
      transition: opacity 0.2s;
      
      &:hover {
        text-decoration: underline;
        opacity: 0.8;
      }
    }
  }
  
  .period {
    font-size: 14px;
    color: ${({ theme }) => theme.secondary};
    margin-bottom: 15px;
    display: block;
  }
`;

const Experience = () => {
  const { data: experience } = useQuery({ queryKey: ['experience'], queryFn: fetchExperience });

  if (!experience) return null;

  return (
    <Section id="experience">
      <SectionTitle
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        Work Experience
      </SectionTitle>

      <Timeline>
        {experience.map((exp, index) => (
          <TimelineItem
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <TimelineContent>
              <h3>{exp.role}</h3>
              <h4>
                {exp.companyLink ? (
                  <a href={exp.companyLink} target="_blank" rel="noreferrer">
                    {exp.company}
                  </a>
                ) : (
                  exp.company
                )}
              </h4>
              <span className="period">{exp.period}</span>
              
              {exp.projects.map((proj, pIndex) => (
                <div key={pIndex} style={{ marginTop: '15px' }}>
                  <strong style={{ color: 'var(--text)' }}>{proj.name}:</strong> 
                  <p style={{ color: 'var(--secondary)', marginTop: '5px', fontSize: '15px' }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
};

export default Experience;
