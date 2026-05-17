import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../api/api';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

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

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  align-items: stretch; /* Đảm bảo các thẻ có cùng chiều cao */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  backdrop-filter: ${({ theme }) => theme.glass};
  -webkit-backdrop-filter: ${({ theme }) => theme.glass};
  padding: 35px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%; /* Cân bằng chiều cao */

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 40px rgba(37, 99, 235, 0.15); /* Primary glow */
  }
`;

const CardHeader = styled.div`
  margin-bottom: 20px;
  
  h3 {
    font-size: 24px;
    color: ${({ theme }) => theme.text};
    margin-bottom: 5px;
  }

  .period {
    color: ${({ theme }) => theme.primary};
    font-size: 14px;
    font-weight: 500;
  }
`;

const ProjectDetails = styled.div`
  color: ${({ theme }) => theme.secondary};
  font-size: 15px;
  margin-bottom: 25px;
  flex-grow: 1;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 12px;
    
    strong {
      color: ${({ theme }) => theme.text};
    }
  }
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  margin-bottom: 25px;
  font-family: monospace;
`;

const TechTag = styled.li`
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
`;

const Links = styled.div`
  display: flex;
  gap: 20px;
  margin-top: auto;

  a {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.text};
    font-size: 15px;
    font-weight: 500;
    
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
    
    svg {
      font-size: 20px;
    }
  }
`;

const Projects = () => {
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: fetchProjects });

  if (!projects) return null;

  return (
    <Section id="projects">
      <SectionTitle
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        Projects
      </SectionTitle>

      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <CardHeader>
              <h3>{project.name}</h3>
              <div className="period">{project.period}</div>
            </CardHeader>
            
            <ProjectDetails>
              <ul>
                {project.details.map((detail, dIndex) => {
                  if (detail.includes(':')) {
                    const [title, ...descArr] = detail.split(':');
                    const desc = descArr.join(':');
                    return (
                      <li key={dIndex}>
                        <strong>{title}:</strong>{desc}
                      </li>
                    );
                  }
                  return <li key={dIndex}>{detail}</li>;
                })}
              </ul>
            </ProjectDetails>
            
            <TechList>
              {project.techStack.map((tech, tIndex) => (
                <TechTag key={tIndex}>{tech}</TechTag>
              ))}
            </TechList>
            
            <Links>
              {project.github.map((link, lIndex) => (
                <a key={lIndex} href={link.url} target="_blank" rel="noreferrer">
                  <FiGithub /> 
                  {link.label}
                </a>
              ))}
            </Links>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </Section>
  );
};

export default Projects;
