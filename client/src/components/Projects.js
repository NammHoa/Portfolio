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

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const ProjectCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px -15px rgba(0,0,0,0.3);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 28px;
    color: ${({ theme }) => theme.text};
    margin-bottom: 10px;
  }

  .period {
    color: ${({ theme }) => theme.primary};
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

const ProjectDetails = styled.div`
  background-color: ${({ theme }) => theme.card};
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 10px 30px -15px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  z-index: 2;

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    color: ${({ theme }) => theme.secondary};
    font-size: 15px;
    margin-bottom: 10px;
    
    strong {
      color: ${({ theme }) => theme.text};
    }
  }
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  list-style: none;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.secondary};
  font-family: monospace;
  font-size: 14px;
`;

const Links = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: ${({ theme }) => theme.text};
    font-size: 22px;
    
    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const Projects = () => {
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: fetchProjects });

  if (!projects) return null;

  return (
    <Section id="projects">
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Some Things I've Built
      </SectionTitle>

      <ProjectList>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            style={{ direction: index % 2 !== 0 ? 'rtl' : 'ltr' }}
          >
            <ProjectImage>
              <img src={project.imageUrl} alt={project.name} />
            </ProjectImage>
            
            <ProjectContent style={{ direction: 'ltr', alignItems: index % 2 !== 0 ? 'flex-end' : 'flex-start', textAlign: index % 2 !== 0 ? 'right' : 'left' }}>
              <span className="period">{project.period}</span>
              <h3>{project.name}</h3>
              
              <ProjectDetails>
                <ul>
                  {project.details.map((detail, dIndex) => {
                    const [title, ...descArr] = detail.split(':');
                    const desc = descArr.join(':');
                    return (
                      <li key={dIndex} style={{ textAlign: 'left' }}>
                        <strong>{title}:</strong>{desc}
                      </li>
                    );
                  })}
                </ul>
              </ProjectDetails>
              
              <TechList>
                {project.techStack.map((tech, tIndex) => (
                  <li key={tIndex}>{tech}</li>
                ))}
              </TechList>
              
              <Links>
                {project.github.map((link, lIndex) => (
                  <a key={lIndex} href={link.url} target="_blank" rel="noreferrer" title={link.label}>
                    <FiGithub />
                  </a>
                ))}
                <a href="#" target="_blank" rel="noreferrer" title="Live Demo">
                  <FiExternalLink />
                </a>
              </Links>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectList>
    </Section>
  );
};

export default Projects;
