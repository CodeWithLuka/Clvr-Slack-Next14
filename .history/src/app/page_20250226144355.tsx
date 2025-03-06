"use client";

import { useAuthActions } from "@convex-dev/auth/react";

import { UserButton } from "@/features/auth/components/user-button";

const HomePage = () => {
	const { signOut } = useAuthActions();

	return (
		<div className="items-center justify-center space-y-2.5 p-10">
			<h1>Hello Emmanuel</h1>
			<UserButton />
		</div>
	);
};

export default HomePage;
