"use client";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

const MemberIdPage = () => {
	const workspaceId = useWorkspaceId();

	return (
		<div>
			<h1>MemberIdPage</h1>
		</div>
	);
};

export default MemberIdPage;
