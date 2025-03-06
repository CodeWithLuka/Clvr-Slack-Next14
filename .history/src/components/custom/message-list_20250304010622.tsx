import { GetMessagesReturnType } from "@/features/messages/api/use-get-messages";

interface MessageListProps {
	memberName?: string;
	memberImage?: string;
	channelName?: string;
	channelCreationTime?: number;
	variant?: "channel" | "thread" | "conversation";
	data: GetMessagesReturnType | undefined;
	loadMore: () => void;
	isLoadingMore: boolean;
	canLoadMore: boolean;
}

export const MessageList = ({
	memberName,
	memberImage,
	channelName,
	channelCreationTime,
	variant = "channel",
	data,
	loadMore,
	isLoadingMore,
	canLoadMore,
}: MessageListProps) => {
	return (
		<div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
			<div>Heyy</div>
		</div>
	);
};
