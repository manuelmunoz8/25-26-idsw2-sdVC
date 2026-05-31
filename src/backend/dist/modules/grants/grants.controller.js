"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrantsController = void 0;
const common_1 = require("@nestjs/common");
let GrantsController = class GrantsController {
    async search(keyword) {
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
                return grants.filter(g => g.title.toLowerCase().includes(keyword.toLowerCase()) ||
                    g.agency.toLowerCase().includes(keyword.toLowerCase()));
            }
            return grants;
        }
        catch (error) {
            return { error: 'Error al conectar con Grants.gov' };
        }
    }
};
exports.GrantsController = GrantsController;
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GrantsController.prototype, "search", null);
exports.GrantsController = GrantsController = __decorate([
    (0, common_1.Controller)('grants')
], GrantsController);
//# sourceMappingURL=grants.controller.js.map