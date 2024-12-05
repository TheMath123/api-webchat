import { Request, Response } from 'express';
import { UUID } from '../helpers/UUID';
import user from '../models/UserSchema';

export default class HomeController {
  static index(request: Request, response: Response) {
    const urlImage =
      'https://i0.wp.com/winkgo.com/wp-content/uploads/2022/03/easter-memes-73.jpg?resize=720%2C720&ssl=1';
    response.send(`<img src=${urlImage} alt="Easter Egg">`);
  }

  static async login(req: Request, res: Response) {
    const { name, color } = req.body;

    if (!name || name.length < 3)
      res.status(401).json({ error: 'Name invalid' });

    const uuid = UUID.generateId(name);

    try {
      const users = await user.findOne({ userid: uuid });

      console.log(users);

      if (users) {
        return users;
      }

      const newUser = await user.create({
        userid: uuid,
        name,
        color: color ?? '',
      });

      return newUser;
    } catch (error) {
      console.log('[HomeController] Login - Error:', error);
    }
  }
}
