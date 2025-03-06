"use client";

import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";

import { useCreateOrGetConversation } from "@/features/conversations/api/use-create-or-get-conversation";
import { useMemberId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const MemberIdPage = () => {
	const memberId = useMemberId();
	const workspaceId = useWorkspaceId();

	const { data, mutate, isPending } = useCreateOrGetConversation();

	useEffect(() => {
		mutate({
			workspaceId,
			memberId,
		});
	}, [memberId, mutate, workspaceId]);

	if (isPending) {
		return (
			<div className="h-full flex items-center justify-center">
				<LoaderIcon className="size-6 animate-spin text-muted-foreground" />
			</div>
		);
	}

	return (
		<div>
			<h1>{JSON.stringify({ memberId, workspaceId })}</h1>
		</div>
	);
};

export default MemberIdPage;
