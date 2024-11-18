import { Permission } from "node-appwrite";
import { db, votesCollection } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
	// Create a new collection
	await databases.createCollection(db, votesCollection, votesCollection, [
		Permission.read("any"),
		Permission.create("users"),
		Permission.update("users"),
		Permission.delete("users"),
		Permission.create("users"),
	]);

	console.log("Vote collection created");

	// Create attributes and indexes
	await Promise.all([
		databases.createEnumAttribute(
			db,
			votesCollection,
			"type",
			["answer", "question"],
			true
		),
		databases.createEnumAttribute(
			db,
			votesCollection,
			"voteStatus",
			["upvoted", "downvoted"],
			true
		),
		databases.createStringAttribute(db, votesCollection, "typeId", 50, true),
		databases.createStringAttribute(db, votesCollection, "votedById", 50, true),
	]);

	console.log("Vote collection attributes created");
}
