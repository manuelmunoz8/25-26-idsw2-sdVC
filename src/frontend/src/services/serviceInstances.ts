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
  findAll: async () => (await api.get('/projects')).data,
  findOne: async (id: string) => (await api.get(`/projects/${id}`)).data,
  create: async (dto: CreateProjectDto) => (await api.post('/projects', dto)).data,
  update: async (id: string, dto: UpdateProjectDto) => (await api.put(`/projects/${id}`, dto)).data,
  remove: async (id: string) => { await api.delete(`/projects/${id}`); },
};

export const investigatorsService: any = {
  findAll: async () => (await api.get('/investigators')).data,
  findOne: async (id: string) => (await api.get(`/investigators/${id}`)).data,
  create: async (dto: any) => (await api.post('/investigators', dto)).data,
};

export const publicationsService = {
  findAll: async () => (await api.get('/publications')).data,
  getMy: async () => (await api.get('/publications/my')).data,
  create: async (dto: CreatePublicationDto) => (await api.post('/publications', dto)).data,
};

export const rewardsService = {
  findAll: async () => (await api.get('/rewards')).data,
  create: async (dto: CreateRewardDto) => (await api.post('/rewards', dto)).data,
};

export const profileService = {
  get: async () => (await api.get('/profile')).data,
  update: async (dto: any) => (await api.put('/profile', dto)).data,
  requestDeletion: async () => (await api.post('/profile/request-deletion')).data,
  getDeletionRequests: async () => (await api.get('/profile/deletion-requests')).data,
};
