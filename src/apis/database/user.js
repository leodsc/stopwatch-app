import { Mongo } from './mongo.js';

class User extends Mongo {
  constructor(data) {
    super();
    this.data = data;
    this.collection = "users";
  }

  create = async () => {
    const collection = await this.start();
    await collection.insertOne(this.data);
    await this.close();
  }
}

const user = new User({'testando': '543'});
user.create();
