"use client";

import { useEffect, useMemo } from "react";

import { UserButton } from "@/features/auth/components/user-button";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";

const HomePage = () => {
	const { data, isLoading } = useGetWorkspaces();

	const workspaceId = useMemo(() => data?.[0]?._id, [data]);

	useEffect(() => {
		if (isLoading) return;

		if (workspaceId) {
			console.log("Redirect To Workspace");
		} else {
			console.log("Open Creation Dialog");
		}
	}, [isLoading, workspaceId]);

	return (
		<div className="items-center justify-center space-y-2.5 p-10">
			<UserButton />
		</div>
	);
};

export default HomePage;
