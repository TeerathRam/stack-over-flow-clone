import { db } from "../name";
import createQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";

export default async function getOrCreateDb() {
	try {
		await databases.get(db);
		console.log("Database exists, skipping creation.");
	} catch (error) {
		try {
			await databases.create(db, db);
			console.log("Database created.");
			await Promise.all([
				createQuestionCollection(),
				createAnswerCollection(),
				createCommentCollection(),
				createVoteCollection(),
			]);
			console.log("All collections created.");
		} catch (error) {
			console.log("Error creating database", error);
		}
	}
	return databases;
}
