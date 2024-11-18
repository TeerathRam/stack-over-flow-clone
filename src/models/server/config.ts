import env from "@/env";
import { Client, Databases, Storage, Users } from "node-appwrite";

const client = new Client();

client.setEndpoint(env.endpoint).setProject(env.projectId).setKey(env.apikey);

const databases = new Databases(client);
const storage = new Storage(client);
const users = new Users(client);

export { client, databases, storage, users };
