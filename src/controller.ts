import { Request, Response } from 'express';
import { EtudiantService } from './etudiant.js';

export class EtudiantController {
  private service = new EtudiantService();

  getAll = async (req: Request, res: Response) => {
    const students = await this.service.getAll();
    res.json(students);
  };

  getById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const student = await this.service.getById(id);
    if (!student) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(student);
  };

  create = async (req: Request, res: Response) => {
    const student = await this.service.create(req.body);
    res.status(201).json(student);
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