import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchProfile = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/profile`);
  return data;
};

export const fetchSkills = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/skills`);
  return data;
};

export const fetchExperience = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/experience`);
  return data;
};

export const fetchProjects = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/projects`);
  return data;
};
