import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';
import { Project } from '../projects/entities/project.entity';

@Injectable()
export class GrantsService {
  constructor(private readonly projectsService: ProjectsService) {}

  private readonly mockGrants = [
    { id: '1', title: 'Investigación en Energías Renovables', agency: 'Department of Energy', opportunityNumber: 'DOE-2026-001', closeDate: '2026-12-31', description: 'Fomento de la investigación en energías limpias.' },
    { id: '2', title: 'Salud Pública y Prevención', agency: 'NIH', opportunityNumber: 'NIH-HHS-2026', closeDate: '2026-11-15', description: 'Proyectos de prevención en salud comunitaria.' },
    { id: '3', title: 'Innovación Tecnológica en Educación', agency: 'Department of Education', opportunityNumber: 'ED-GRANTS-0526', closeDate: '2026-10-20', description: 'Uso de IA y nuevas tecnologías en el aula.' },
  ];

  async search(keyword?: string) {
    if (keyword) {
      return this.mockGrants.filter(g => 
        g.title.toLowerCase().includes(keyword.toLowerCase()) || 
        g.agency.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    return this.mockGrants;
  }

  async findOne(id: string) {
    const grant = this.mockGrants.find(g => g.id === id);
    if (!grant) throw new NotFoundException('Convocatoria no encontrada');
    return grant;
  }

  async importGrant(id: string): Promise<Project> {
    const grant = await this.findOne(id);
    return await this.projectsService.create({
      title: grant.title,
      description: `Importado de Grants.gov (${grant.agency} - ${grant.opportunityNumber})\n\n${grant.description}`,
      status: 'draft',
    });
  }
}
