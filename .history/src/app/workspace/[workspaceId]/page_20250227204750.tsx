"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
	const workspaceId = useWorkspaceId();

	return (
		<div>
			<h1>New ID: {workspaceId}</h1>
		</div>
	);
};

export default WorkspaceIdPage;
