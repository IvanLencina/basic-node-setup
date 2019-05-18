import * as express from 'express';
import {injectable} from "inversify";

@injectable()
export class RegisterController {

  constructor() {}

  public byPass(request: express.Request, response: express.Response, next: any) {
    const allowedMethods = ['POST'];

    if (!allowedMethods.includes(request.method)) {
      return response.status(405).send(`
        <iframe 
            src="https://giphy.com/embed/15aGGXfSlat2dP6ohs" 
            width="480" height="272" frameBorder="0" class="giphy-embed" allowFullScreen>
        </iframe>
        <p>Method not allowed.</p>
    `);
    }

    next();
  };

  public create(request: express.Request, response: express.Response) {
    const { name, email, password } = request.body;

    // Clearly, I'm not going to set up a validator for this example
    if (!name) {
      return response.status(400).send('name field is required.')
    }

    if (!email) {
      return response.status(400).send('email field is required.')
    }

    if (!password) {
      return response.status(400).send('password field is required.')
    }

    response.status(201).send('Perfect!');
  };
}