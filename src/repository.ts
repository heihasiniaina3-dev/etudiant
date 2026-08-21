import { Etudiant } from './etudiant.js';

export class EtudiantRepository {
  private students: Etudiant[] = [
    { id: 1, nom: 'Rakoto', prenom: 'Andry', email: 'andry@example.com', password: 'password123', role: 'student' },
    { id: 2, nom: 'Rasoa', prenom: 'Fara', email: 'fara@example.com', password: 'password123', role: 'admin' }
  ];

  async findAll(): Promise<Etudiant[]> {
    return this.students;
  }

  async findById(id: number): Promise<Etudiant | undefined> {
    return this.students.find(e => e.id === id);
  }

  async findByEmail(email: string): Promise<Etudiant | undefined> {
    return this.students.find(e => e.email === email);
  }

  async create(data: any): Promise<Etudiant> {
    const newStudent: Etudiant = {
      id: Date.now(),
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      password: data.password,
      role: data.role || 'student'
    };
    this.students.push(newStudent);
    return newStudent;
  }

  async delete(id: number): Promise<boolean> {
    const index = this.students.findIndex(e => e.id === id);
    if (index === -1) return false;
    this.students.splice(index, 1);
    return true;
  }
}