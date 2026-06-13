import api from './api';
import { IBaseService } from '../types/base.service';
import { CreateProjectDto, UpdateProjectDto } from '@dtos/project.dto';
import { CreatePublicationDto } from '@dtos/publication.dto';
import { CreateRewardDto } from '@dtos/create-reward.dto';
import { LoginDto } from '@dtos/login.dto';

// --- Servicios ---

export const authService = {
  validarCredenciales: async (dto: LoginDto) => {
    const response = await api.post('/api/auth/login', dto);
    return response.data;
  },
};

export const projectsService: IBaseService<any> = {
  findAll: async () => (await api.get('/api/projects')).data,
  findOne: async (id: string) => (await api.get(`/api/projects/${id}`)).data,
  create: async (dto: CreateProjectDto) => (await api.post('/api/projects', dto)).data,
  update: async (id: string, dto: UpdateProjectDto) => (await api.put(`/api/projects/${id}`, dto)).data,
  remove: async (id: string) => { await api.delete(`/api/projects/${id}`); },
};

export const investigatorsService: any = {
  findAll: async () => (await api.get('/api/users', { params: { role: 'investigator' } })).data,
  findOne: async (id: string) => (await api.get(`/api/users/${id}`)).data,
  create: async (dto: any) => (await api.post('/api/users', dto)).data,
};

export const publicationsService = {
  findAll: async () => (await api.get('/api/publications')).data,
  getMy: async () => (await api.get('/api/publications/my')).data,
  create: async (dto: CreatePublicationDto) => (await api.post('/api/publications', dto)).data,
};

export const rewardsService = {
  findAll: async () => (await api.get('/api/rewards')).data,
  create: async (dto: CreateRewardDto) => (await api.post('/api/rewards', dto)).data,
};

export const profileService = {
  get: async () => (await api.get('/api/profile')).data,
  update: async (dto: any) => (await api.put('/api/profile', dto)).data,
  requestDeletion: async () => (await api.post('/api/profile/request-deletion')).data,
  getDeletionRequests: async () => (await api.get('/api/profile/deletion-requests')).data,
};
