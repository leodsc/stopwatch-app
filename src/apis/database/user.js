import { Mongo } from './mongo.js';
import validator from 'validator';

const { isEmail, isStrongPassword } = validator;

class User extends Mongo {
  constructor(data) {
    super();
    this.data = data;
    this.collection = "users";
  }

  create = async () => {
    switch(true) {
      case this.data.name.length < 3 ||
          this.data.name.length > 20:
        return { status: 400, content: 'Nome inválido.'};
      case !isEmail(this.data.email):
        return { status: 400, content: 'E-mail inválido.' }; // Bad request
      case !isStrongPassword(this.data.password):
        return { status: 400, content: 'Senha inválida.'};
      case this.data.password !== this.data['confirm-password']:
        return { status: 400, content: 'Senha diferente da confirmação.' };
      default:
        break;
    }

    delete this.data['confirm-password'];
    const collection = await this.start();
    const result = await collection.find({ email: this.data.email }).toArray();
    let resp = { status: '', content: 'E-mail já é usado.' };
    if (result.length == 0) { 
      await collection.insertOne(this.data);
      resp.status = 200; // OK
      resp.content = 'Conta criada com sucesso! Redirecionando em ';
    }
    else resp.status = 409; // http code for conflict (email already used)
    await this.close();
    return resp;
  }
}

export default User;
