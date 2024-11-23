"use client";

import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React from "react";

function LoginPage() {
	const { login } = useAuthStore();
	const router = useRouter();
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// collect data
		const formData = new FormData(e.currentTarget);
		const email = formData.get("email");
		const password = formData.get("password");

		//validate data
		if (!email || !password) {
			setError(() => "Please fill out all the fields");
			return;
		}

		setIsLoading(() => true);
		setError(() => "");
		const response = await login(email?.toString(), password?.toString());
		if (response.error) {
			setError(() => response.error!.message);
		} else {
			setIsLoading(() => false);
			router.push("/");
		}
	};
	return <div>LoginPage</div>;
}

export default LoginPage;
