import * as express from 'express';
import {injectable} from "inversify";

const MAX_STRING_LEN = 200;

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
    const name = String(request.body.name);
    const email = String(request.body.email);
    const password = String(request.body.password);

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

    if (name.length >= MAX_STRING_LEN) {
      return response.status(422).send('name field is too long.');
    }
    else if (email.length >= MAX_STRING_LEN) {
      return response.status(422).send('email field is too long.');
    }
    else if (password.length >= MAX_STRING_LEN) {
      return response.status(422).send('password field is too long.');
    }
    
    console.log(`New Register:\nName: ${name}\nEmail: ${email}\nPassword: ${password}\n`);
    response.status(201).send('Perfect!');
  };
}