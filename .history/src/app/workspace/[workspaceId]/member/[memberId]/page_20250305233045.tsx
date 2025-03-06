"use client";

import { AlertTriangleIcon, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useCreateOrGetConversation } from "@/features/conversations/api/use-create-or-get-conversation";

import { useMemberId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { Id } from "../../../../../../convex/_generated/dataModel";

const MemberIdPage = () => {
	const memberId = useMemberId();
	const workspaceId = useWorkspaceId();

	const [conversationId, setConversationId] =
		useState<Id<"conversations"> | null>(null);

	const { data, mutate, isPending } = useCreateOrGetConversation();

	useEffect(() => {
		mutate(
			{
				workspaceId,
				memberId,
			},
			{
				onSuccess(data) {
					setConversationId(data);
				},
				onError(error) {
					toast.error("Failed To Get Conversation");
				},
			},
		);
	}, [memberId, mutate, workspaceId]);

	if (isPending) {
		return (
			<div className="h-full flex items-center justify-center">
				<LoaderIcon className="size-6 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (!data) {
		return (
			<div className="h-full flex flex-col gap-y-2 items-center justify-center">
				<AlertTriangleIcon className="size-6 text-muted-foreground" />
				<span className="text-sm text-muted-foreground">
					Conversation Not Found
				</span>
			</div>
		);
	}

	return (
		<div>
			<h1>{JSON.stringify(data)}</h1>
		</div>
	);
};

export default MemberIdPage;
