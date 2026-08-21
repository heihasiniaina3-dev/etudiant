import { Request, Response } from 'express';
import { EtudiantService } from './etudiant.js';

export class EtudiantController {
  private service = new EtudiantService();

  getAll = async (req: Request, res: Response) => {
    const students = await this.service.getAll();
    // Optionnel : masquer les mots de passe pour toute la liste
    const studentsWithoutPassword = students.map(({ password, ...rest }) => rest);
    res.json(studentsWithoutPassword);
  };

  getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const student = await this.service.getById(id);
    if (!student) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    // Masquer le mot de passe
    const { password, ...studentWithoutPassword } = student;
    res.json(studentWithoutPassword);
  };

  create = async (req: Request, res: Response) => {
    try {
      const { email, password, role, ...rest } = req.body;

      // 1. Vérifier si l'email existe déjà (suppose que votre service a une méthode pour chercher par email)
        const existingStudent = await this.service.getByEmail(email);
      if (existingStudent) {
        res.status(400).json({ message: "Email déjà utilisé" });
        return;
      }

      const newStudentData = {
        email,
        password, 
        role: role || 'student', 
        ...rest
      };

      const student = await this.service.create(newStudentData);

      // 3. Masquer le mot de passe dans la réponse Postman
      const { password: _, ...studentWithoutPassword } = student;
      res.status(201).json(studentWithoutPassword);

    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erreur serveur" });
    }
  };

  delete = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const success = await this.service.delete(id);
    if (!success) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json({ message: "Deleted successfully" });
  };
}