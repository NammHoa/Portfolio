import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchSkills } from '../api/api';

const Section = styled.section`
  padding: 100px 0;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 32px;
  margin-bottom: 50px;
  text-align: center;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
`;

const SkillCategory = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  backdrop-filter: ${({ theme }) => theme.glass};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass};
  padding: 30px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  }

  h3 {
    color: ${({ theme }) => theme.primary};
    margin-bottom: 25px;
    font-size: 22px;
    font-weight: 700;
  }
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Tag = styled(motion.span)`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.2s ease;
  cursor: default;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: #fff;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Skills = () => {
  const { data: skills } = useQuery({ queryKey: ['skills'], queryFn: fetchSkills });

  if (!skills) return null;

  return (
    <Section id="skills">
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Technical Skills
      </SectionTitle>

      <SkillsGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skills.map((skillGroup, index) => (
          <SkillCategory key={index} variants={itemVariants}>
            <h3>{skillGroup.category}</h3>
            <SkillTags>
              {skillGroup.items.map((item, i) => (
                <Tag 
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </Tag>
              ))}
            </SkillTags>
          </SkillCategory>
        ))}
      </SkillsGrid>
    </Section>
  );
};

export default Skills;
