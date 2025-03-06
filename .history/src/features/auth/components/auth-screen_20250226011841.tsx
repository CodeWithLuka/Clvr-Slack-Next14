"use client";

import { useState } from "react";

import { SignInFlow } from "../types";

export const AuthScreen = () => {
	const [state, setState] = useState<SignInFlow>("signIn");

	return (
		<div className="h-full flex items-center justify-center bg-[#5C3B58]">
			<h1>Auth Screen</h1>
		</div>
	);
};
