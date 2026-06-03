"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
class BaseService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async findAll() {
        return await this.repository.find();
    }
    async findOne(id) {
        const record = await this.repository.findOne({
            where: { id }
        });
        if (!record) {
            throw new common_1.NotFoundException(`Record with ID ${id} not found`);
        }
        return record;
    }
    async create(data) {
        const record = this.repository.create(data);
        return await this.repository.save(record);
    }
    async update(id, data) {
        await this.findOne(id);
        await this.repository.update(id, data);
        return await this.findOne(id);
    }
    async remove(id) {
        const record = await this.findOne(id);
        await this.repository.remove(record);
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map