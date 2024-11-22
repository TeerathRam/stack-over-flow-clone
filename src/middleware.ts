import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getOrCreateDb from "./models/server/dbCofig";
import getOrCreateStorage from "./models/server/storageSetup";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	await Promise.all([getOrCreateDb(), getOrCreateStorage()]);

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
