import { LoaderIcon } from "lucide-react";

import { useGetMember } from "@/features/members/api/use-get-member";
import { useGetMessages } from "@/features/messages/api/use-get-messages";

import { MessageList } from "@/components/custom/message-list";

import { useMemberId } from "@/hooks/use-member-id";

import { Id } from "../../../../../../../convex/_generated/dataModel";

import { ConversationChatInput } from "./conversation-chat-input";
import { ConversationHeader } from "./conversation-header";

interface ConversationProps {
	id: Id<"conversations">;
}

export const Conversation = ({ id }: ConversationProps) => {
	const memberId = useMemberId();

	const { data: member, isLoading: memberLoading } = useGetMember({
		id: memberId,
	});

	const { results, status, loadMore } = useGetMessages({
		conversationId: id,
	});

	if (memberLoading || status === "LoadingFirstPage") {
		return (
			<div className="h-full flex items-center justify-center">
				<LoaderIcon className="size-6 animate-spin text-muted-foreground" />
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full">
			<ConversationHeader
				memberName={member?.user.name}
				memberImage={member?.user.image}
				onClick={() => {}}
			/>
			<MessageList
				data={results}
				variant="conversation"
				memberImage={member?.user.image}
				memberName={member?.user.name}
				loadMore={loadMore}
				isLoadingMore={status === "LoadingMore"}
				canLoadMore={status === "CanLoadMore"}
			/>
			<ConversationChatInput
				placeholder={`Message ${member?.user.name}`}
				conversationId={id}
			/>
		</div>
	);
};
