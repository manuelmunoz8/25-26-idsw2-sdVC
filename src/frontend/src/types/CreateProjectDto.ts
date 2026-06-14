export interface CreateProjectDto {
  title: string;
  description?: string;
  objectives?: string;
  startDate?: string;
  endDate?: string;
  status: 'draft';
}
