import { Permission } from "node-appwrite";
import { db, commentsCollection } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
	// Create a new collection
	await databases.createCollection(db, commentsCollection, commentsCollection, [
		Permission.read("any"),
		Permission.create("users"),
		Permission.update("users"),
		Permission.delete("users"),
		Permission.create("users"),
	]);

	// Create attributes and indexes
	await Promise.all([
		databases.createStringAttribute(
			db,
			commentsCollection,
			"content",
			10000,
			true
		),
		databases.createEnumAttribute(
			db,
			commentsCollection,
			"type",
			["answer", "question"],
			true
		),
		databases.createStringAttribute(db, commentsCollection, "typeId", 50, true),
		databases.createStringAttribute(
			db,
			commentsCollection,
			"authorId",
			50,
			true
		),
	]);
}
