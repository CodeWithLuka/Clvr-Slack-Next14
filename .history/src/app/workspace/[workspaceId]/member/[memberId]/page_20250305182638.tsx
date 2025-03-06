"use client";

import { useCreateOrGetConversation } from "@/features/conversations/api/use-create-or-get-conversation";
import { useMemberId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const MemberIdPage = () => {
	const memberId = useMemberId();
	const workspaceId = useWorkspaceId();

	const { data, mutate, isPending } = useCreateOrGetConversation();

	return (
		<div>
			<h1>{JSON.stringify({ memberId, workspaceId })}</h1>
		</div>
	);
};

export default MemberIdPage;
