"use client";

import { useMemberId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const MemberIdPage = () => {
	const memberId = useMemberId();
	const workspaceId = useWorkspaceId();

	return (
		<div>
			<h1>{JSON.stringify({ memberId, workspaceId })}</h1>
		</div>
	);
};

export default MemberIdPage;
