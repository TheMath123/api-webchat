import { Request, Response } from 'express';

export default class HomeController {
  static index(request: Request, response: Response) {
    const urlImage =
      'https://i0.wp.com/winkgo.com/wp-content/uploads/2022/03/easter-memes-73.jpg?resize=720%2C720&ssl=1';
    response.send(`<img src=${urlImage} alt="Easter Egg">`);
  }
}
