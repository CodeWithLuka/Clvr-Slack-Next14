import { format } from "date-fns";

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
	const groupedMessages = data?.reduce(
		(groups, message) => {
			if (!message?._creationTime) return groups;

			const date = new Date(message._creationTime);
			const dateKey = format(date, "yyyy-MM-dd");

			if (!groups[dateKey]) {
				groups[dateKey] = [];
			}

			groups[dateKey].unshift(message);

			return groups;
		},
		{} as Record<string, typeof data>,
	);

	return (
		<div className="flex-1 flex flex-col-reverse pb-4 overflow-y-auto messages-scrollbar">
			{data?.map((message) => (
				<div key={message?._id}>{JSON.stringify(message)}</div>
			))}
		</div>
	);
};
