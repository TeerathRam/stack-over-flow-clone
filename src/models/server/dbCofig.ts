import { db } from "../name";
import createQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";

export default async function getOrCreateDb() {
	try {
		await databases.get(db);
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
		} catch (error) {
			console.log("Error creating database", error);
		}
	}
	return databases;
}
