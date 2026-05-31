import { Controller, Get, Query } from '@nestjs/common';
import axios from 'axios';

@Controller('grants')
export class GrantsController {
  @Get('search')
  async search(@Query('keyword') keyword: string) {
    // Grants.gov API Pública (Endpoint de búsqueda simplificado)
    // Nota: En un entorno real, esto podría requerir una API Key o parsear su XML/JSON
    // Usaremos un mock que simula la respuesta de Grants.gov para el prototipo
    try {
      // Simulación de respuesta de Grants.gov
      const grants = [
        { id: '1', title: 'Investigación en Energías Renovables', agency: 'Department of Energy', opportunityNumber: 'DOE-2026-001', closeDate: '2026-12-31' },
        { id: '2', title: 'Salud Pública y Prevención', agency: 'NIH', opportunityNumber: 'NIH-HHS-2026', closeDate: '2026-11-15' },
        { id: '3', title: 'Innovación Tecnológica en Educación', agency: 'Department of Education', opportunityNumber: 'ED-GRANTS-0526', closeDate: '2026-10-20' },
      ];

      if (keyword) {
        return grants.filter(g => 
          g.title.toLowerCase().includes(keyword.toLowerCase()) || 
          g.agency.toLowerCase().includes(keyword.toLowerCase())
        );
      }

      return grants;
    } catch (error) {
      return { error: 'Error al conectar con Grants.gov' };
    }
  }
}
