import { Mongo } from "./mongo.js";
import validator from "validator";
import bcrypt from "bcrypt";
import uniqueString from "unique-string";

const { isEmail, isStrongPassword } = validator;

class User extends Mongo {
  constructor(data) {
    super();
    this.data = data;
    this.collection = "users";
  }

  create = async () => {
    switch (true) {
      case this.data.name.length < 3 || this.data.name.length > 20:
        return { status: 400, content: "Nome inválido." };
      case !isEmail(this.data.email):
        return { status: 400, content: "E-mail inválido." }; // Bad request
      case !isStrongPassword(this.data.password):
        return { status: 400, content: "Senha inválida." };
      case this.data.password !== this.data["confirm-password"]:
        return { status: 400, content: "Senha diferente da confirmação." };
      default:
        break;
    }

    delete this.data["confirm-password"];
    const collection = await this.start();
    const result = await collection.find({ email: this.data.email }).toArray();
    let resp = { status: "", content: "E-mail já é usado." };
    if (result.length == 0) {
      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(this.data.password, salt, async (err, hash) => {
          this.data.password = hash;
          await collection.insertOne(this.data);
          await this.close();
        });
      });
      resp.status = 200; // OK
      resp.content = "Conta criada com sucesso!";
    } else {
      resp.status = 409; // http code for conflict (email already used)
      await this.close();
    }
    return resp;
  };

  enter = async () => {
    const collection = await this.start();
    const result = await collection.findOne({ email: this.data.email });
    const authentication = await bcrypt.compare(
      this.data.password,
      result.password
    );
    if (authentication) {
      const id = uniqueString();
      await collection.updateOne(result, {
        $set: { ...result, sessionCookie: id },
      });
      return { status: true, content: "Entrando...", sessionCookie: id };
    } else return { status: false, content: "E-mail ou senha estão errados." };
  };
}

export default User;
