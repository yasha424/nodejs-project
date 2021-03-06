import { HTTPError } from '../errors/http-error.class.js';
import { RolesRepository } from './roles.repository.js';

export class RoleService {
  constructor(prismaService) {
    this.rolesRepository = new RolesRepository(prismaService);
  }

  async createRole({ name }) {
    return this.rolesRepository.create({ name });
  }

  async getRoleInfo(id) {
    const role = await this.rolesRepository.findById(id);
    return role ?? new HTTPError(404, `Role with id(${id}) not found`);
  }

  async updateRole(id, data) {
    const role = await this.rolesRepository.findById(id);
    if (!role) {
      throw new HTTPError(403, `Role with id(${id}) not found`);
    }
    return this.rolesRepository.update(id, data);
  }

  async deleteRole(id) {
    const existedRole = await this.rolesRepository.findById(id);
    if (!existedRole) {
      throw new HTTPError(404, `Role with id(${id}) not found`);
    }
    return this.rolesRepository.deleteById(id);
  }
}
