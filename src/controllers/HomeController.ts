import { Request, Response } from 'express';

export default class HomeController {
  static index(request: Request, response: Response) {
    response.send(
      `<img src="https://firebasestorage.googleapis.com/v0/b/matheuspa-projects.appspot.com/o/easter-egg%2Feaster-egg-dinochat.png?alt=media&token=4fb5327a-7fe0-41b9-8799-9382557bfaf2" alt="Easter Egg">`,
    );
  }
}
