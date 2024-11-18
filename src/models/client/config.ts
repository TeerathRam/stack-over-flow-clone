import env from "@/env";
import { Client, Account, Databases, Avatars, Storage } from "appwrite";

const client = new Client().setEndpoint(env.endpoint).setProject(env.projectId);

const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
const account = new Account(client);

export { client, databases, avatars, storage, account };
