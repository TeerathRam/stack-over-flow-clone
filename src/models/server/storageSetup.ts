import { Permission } from "node-appwrite";
import { questionsAttachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
	try {
		await storage.getBucket(questionsAttachmentBucket);
	} catch (error) {
		try {
			await storage.createBucket(
				questionsAttachmentBucket,
				questionsAttachmentBucket,
				[
					Permission.read("any"),
					Permission.create("users"),
					Permission.update("users"),
					Permission.delete("users"),
					Permission.create("users"),
				],
				false,
				undefined,
				undefined,
				["jpg", "jpeg", "png", "gif", "heic", "webp"]
			);
		} catch (error) {
			console.log("Error creating storage collection", error);
		}
	}
}
