import { EtudiantRepository } from './repository.js';

export interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  password?: string;
  role?: string;
  [key: string]: any;
}

export class EtudiantService {
  private repo = new EtudiantRepository();

  async getAll() {
    return await this.repo.findAll();
  }

  async getById(id: number) {
    return await this.repo.findById(id);
  }

  async getByEmail(email: string) {
    return await this.repo.findByEmail(email);
  }

  async create(data: any) {
    return await this.repo.create(data);
  }

  async delete(id: number) {
    return await this.repo.delete(id);
  }
}