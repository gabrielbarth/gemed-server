import { Request, Response } from 'express';

import InternalCommunication from '../database/models/InternalCommunication'


class InternalCommunicationController {
  async store(request: Request, response: Response) {
    try {
      const { title, author } = request.body;

      if(!title) {
        return response.status(400).json({ error: "Title is required" })
      }

      if(!author) {
        return response.status(400).json({ error: "Author is required" })
      }

      const communication = await InternalCommunication.create(request.body);
      
      return response.status(201).json(communication);
    } catch (err) {
      return response.status(400).json({ error: "Communication creation failed" })
      
    }

  }

  async index(request: Request, response: Response) {
    try {
      const { page = 1 } = request.query;
      const limitContent = 10;

      const communications = await InternalCommunication.find()
        .limit(limitContent)
        .skip((page - 1) * limitContent)
        .sort({ic_number: -1});
      
      return response.json(communications);       

    } catch (err) {
      return response.status(400).json({ error: "List Communications failed" })
      
    }
  }

  async update(request: Request, response: Response) {
    try {
       const { title, to, author } = request.body;

      const communication = await InternalCommunication.findByIdAndUpdate(request.params.communicationId, {
        title, 
        to,
        author
      }, { new: true });

      communication?.save();

      return response.json(communication);       

    } catch (err) {
      return response.status(400).json({ error: "Error updating communication" });
      
    }
  }

  async delete(request: Request, response: Response) {
    try {
      await InternalCommunication.findByIdAndRemove(request.params.communicationId);

      return response.send();       

    } catch (err) {
      return response.status(400).json({ error: "Error deleting communication" });
      
    }
  }
}

export default InternalCommunicationController;