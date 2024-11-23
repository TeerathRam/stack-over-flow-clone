import { IndexType, Permission } from "node-appwrite";
import { db, questionsCollection } from "../name";
import { databases } from "./config";

export default async function createQuestionCollection() {
	// Create a new collection
	await databases.createCollection(
		db,
		questionsCollection,
		questionsCollection,
		[
			Permission.read("any"),
			Permission.create("users"),
			Permission.update("users"),
			Permission.delete("users"),
			Permission.create("users"),
		]
	);

	// Create attributes and indexes
	await Promise.all([
		databases.createStringAttribute(
			db,
			questionsCollection,
			"title",
			100,
			true
		),
		databases.createStringAttribute(
			db,
			questionsCollection,
			"content",
			10000,
			true
		),
		databases.createStringAttribute(
			db,
			questionsCollection,
			"authorId",
			50,
			true
		),
		databases.createStringAttribute(
			db,
			questionsCollection,
			"attachmentId",
			50,
			false
		),
		databases.createStringAttribute(
			db,
			questionsCollection,
			"tags",
			100,
			true,
			undefined,
			true
		),
	]);

	// Create indexes
	await Promise.all([
		databases.createIndex(
			db,
			questionsCollection,
			"title",
			IndexType.Fulltext,
			["title"],
			["asc"]
		),
		databases.createIndex(
			db,
			questionsCollection,
			"content",
			IndexType.Fulltext,
			["content"],
			["asc"]
		),
	]);
}
