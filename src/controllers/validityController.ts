import { Request, Response } from 'express';

import ExternalCommunication from '../database/models/ExternalCommunication'
import InternalCommunication from '../database/models/InternalCommunication'

class ValidityController {
  async store(request: Request, response: Response) {
    try {
      ExternalCommunication.counterReset('ec_number', function(err){
        console.log(err);
      })

      InternalCommunication.counterReset('ic_number', function(err){
        console.log(err);
      })
      
      return response.send()
    } catch (err) {
      return response.status(400).json({ error: "Error when restarting communications numbers" })
      
    }

  }
}

export default ValidityController;