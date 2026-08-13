import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;

app.use(express.json()); 

interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  [key: string]: any;
}

let etudiants: Etudiant[] = [
  { id: 1, nom: 'Rakoto', prenom: 'Andry' },
  { id: 2, nom: 'Rasoa', prenom: 'Fara' }
];

app.get('/etudiants', (req: Request, res: Response): void => {
  res.status(200).json(etudiants);
});

app.get('/etudiants/:id', (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const etudiant = etudiants.find(e => e.id === id);
    
    if (!etudiant) {
      res.status(404).json({ message: "Étudiant non trouvé" });
      return;
    }
    
    res.status(200).json(etudiant);
  } catch (error) {
    next(error);
  }
});

app.post('/etudiants', (req: Request, res: Response, next: NextFunction): void => {
  try {
    const nouveauEtudiant: Etudiant = { id: Date.now(), ...req.body };
    etudiants.push(nouveauEtudiant);
    
    res.status(201).json({
      message: "Étudiant créé avec succès",
      etudiant: nouveauEtudiant
    });
  } catch (error) {
    next(error);
  }
});

app.put('/etudiants/:id', (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const index = etudiants.findIndex(e => e.id === id);
    
    if (index === -1) {
      res.status(404).json({ message: "Étudiant non trouvé" });
      return;
    }
    
    etudiants[index] = { id, ...req.body };
    res.status(200).json({
      message: `L'étudiant avec l'ID ${id} a été mis à jour complètement.`,
      etudiant: etudiants[index]
    });
  } catch (error) {
    next(error);
  }
});

app.patch('/etudiants/:id', (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const etudiant = etudiants.find(e => e.id === id);
    
    if (!etudiant) {
      res.status(404).json({ message: "Étudiant non trouvé" });
      return;
    }
    
    Object.assign(etudiant, req.body);
    res.status(200).json({
      message: `L'étudiant avec l'ID ${id} a été mis à jour partiellement.`,
      etudiant
    });
  } catch (error) {
    next(error);
  }
});

app.delete('/etudiants/:id', (req: Request, res: Response, next: NextFunction): void => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const index = etudiants.findIndex(e => e.id === id);
    
    if (index === -1) {
      res.status(404).json({ message: "Étudiant non trouvé" });
      return;
    }
    
    etudiants.splice(index, 1);
    res.status(200).json({ message: `L'étudiant avec l'ID ${id} a été supprimé.` });
  } catch (error) {
    next(error);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).json({
    message: "Une erreur interne est survenue sur le serveur.",
    error: err.message
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});