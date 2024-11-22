import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/models/client/config";

export interface UserPrefs {
	reputation: number;
}

interface UserAuthStore {
	sessions: Models.Session | null;
	jwt: string | null;
	user: Models.User<UserPrefs> | null;
	hydrated: boolean;

	setHydrated(): void;
	verifySessions(): Promise<void>;
	login(
		email: string,
		password: string
	): Promise<{
		success: boolean;
		error?: AppwriteException | null;
	}>;
	creatAccount(
		name: string,
		email: string,
		password: string
	): Promise<{
		success: boolean;
		error?: AppwriteException | null;
	}>;
	logout(): Promise<void>;
}

export const useAuthStore = create<UserAuthStore>()(
	persist(
		immer((set) => ({
			sessions: null,
			jwt: null,
			user: null,
			hydrated: false,

			setHydrated() {
				set({ hydrated: true });
			},

			async verifySessions() {
				try {
					const session = await account.getSession("current");
					set({ sessions: session });
				} catch (error) {
					console.log(error);
				}
			},

			async login(email, password) {
				try {
					const session = await account.createEmailPasswordSession(
						email,
						password
					);
					const [user, { jwt }] = await Promise.all([
						account.get<UserPrefs>(),
						account.createJWT(),
					]);

					if (!user.prefs?.reputation)
						await account.updatePrefs<UserPrefs>({ reputation: 0 });
					set({ sessions: session, user, jwt });
					return { success: true };
				} catch (error) {
					console.log(error);
					return {
						success: false,
						error: error instanceof AppwriteException ? error : null,
					};
				}
			},

			async creatAccount(name: string, email: string, password: string) {
				try {
					await account.create(ID.unique(), email, password, name);
					return { success: true };
				} catch (error) {
					console.log(error);
					return {
						success: false,
						error: error instanceof AppwriteException ? error : null,
					};
				}
			},

			async logout() {
				try {
					await account.deleteSessions();
					set({ sessions: null, jwt: null, user: null });
				} catch (error) {
					console.log(error);
				}
			},
		})),
		{
			name: "auth",
			onRehydrateStorage() {
				return (state, error) => {
					if (!error) state?.setHydrated();
				};
			},
		}
	)
);
