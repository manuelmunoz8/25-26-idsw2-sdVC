import api from './api';
import { IBaseService } from '../types/base.service';
import { CreateDeliverableDto, UpdateDeliverableDto } from '@dtos/deliverable.dto';

// ... (existing services) ...

export const deliverablesService = {
  findAllByProject: async (projectId: string) => (await api.get(`/api/deliverables/project/${projectId}`)).data,
  findOne: async (id: string) => (await api.get(`/api/deliverables/${id}`)).data,
  create: async (dto: CreateDeliverableDto) => (await api.post('/api/deliverables', dto)).data,
  update: async (id: string, dto: UpdateDeliverableDto) => (await api.patch(`/api/deliverables/${id}`, dto)).data,
  remove: async (id: string) => await api.delete(`/api/deliverables/${id}`),
};

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
  update: async (id: string, dto: UpdateProjectDto) => (await api.patch(`/api/projects/${id}`, dto)).data,
  remove: async (id: string) => { await api.delete(`/api/projects/${id}`); },
  removeInvestigator: async (id: string, investigatorId: string) => await api.delete(`/api/projects/${id}/investigators/${investigatorId}`),
};

export const investigatorsService: any = {
  findAll: async () => (await api.get('/api/users', { params: { role: 'investigador' } })).data,
  findOne: async (id: string) => (await api.get(`/api/users/${id}`)).data,
  create: async (dto: any) => (await api.post('/api/users', dto)).data,
};

export const publicationsService = {
  findAll: async () => (await api.get('/api/publications')).data,
  findOne: async (id: string) => (await api.get(`/api/publications/${id}`)).data,
  getMy: async () => (await api.get('/api/publications/my')).data,
  create: async (dto: CreatePublicationDto) => (await api.post('/api/publications', dto)).data,
  update: async (id: string, dto: any) => (await api.put(`/api/publications/${id}`, dto)).data,
  remove: async (id: string) => await api.delete(`/api/publications/${id}`),
  addReply: async (id: string, reply: { content: string }) => (await api.post(`/api/publications/${id}/replies`, reply)).data,
};

export const rewardsService = {
  findAll: async () => (await api.get('/api/rewards')).data,
  create: async (dto: CreateRewardDto) => (await api.post('/api/rewards', dto)).data,
};

export const profileService = {
  get: async (userId: string) => (await api.get(`/api/users/${userId}`)).data,
  update: async (userId: string, dto: any) => (await api.put(`/api/users/${userId}`, dto)).data,
  requestDeletion: async (userId: string) => (await api.post(`/api/users/${userId}/request-deletion`)).data,
  getDeletionRequests: async () => (await api.get('/api/users/deletion-requests')).data,
  approveDeletion: async (userId: string) => (await api.post(`/api/users/${userId}/approve-deletion`)).data,
  denyDeletion: async (userId: string) => (await api.post(`/api/users/${userId}/deny-deletion`)).data,
};
