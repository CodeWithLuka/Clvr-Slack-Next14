"use client";

import { UserButton } from "@/features/auth/components/user-button";

const HomePage = () => {
	return (
		<div className="items-center justify-center space-y-2.5 p-10">
			<UserButton />
		</div>
	);
};

export default HomePage;
