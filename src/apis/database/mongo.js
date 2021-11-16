import { MongoClient } from 'mongodb';

export class Mongo {
  constructor() {
    this.url = "mongodb://localhost:27017";
    this.client = new MongoClient(this.url);
  }
  start = async () => {
    await this.client.connect();
    const db = this.client.db("Stopwatch");
    return db.collection(this.collection);
  }

  close = async () => {
    this.client.close();
  }
}

