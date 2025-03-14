"use client";

import { LoaderIcon, TriangleAlertIcon } from "lucide-react";

import { useGetChannel } from "@/features/channels/api/use-get-channel";
import { useGetMessages } from "@/features/messages/api/use-get-messages";

import { useChannelId } from "@/hooks/use-channel-id";

import { ChannelHeader } from "./_components/channel-header";
import { ChatInput } from "./_components/chat-input";

const ChannelIdPage = () => {
	const channelId = useChannelId();

	const { results } = useGetMessages({ channelId });
	const { data: channel, isLoading: channelLoading } = useGetChannel({
		id: channelId,
	});

	console.log({ results });

	if (channelLoading) {
		return (
			<div className="h-full flex-1 flex items-center justify-center">
				<LoaderIcon className="animate-spin size-5 text-muted-foreground" />
			</div>
		);
	}

	if (!channel) {
		return (
			<div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
				<TriangleAlertIcon className="size-5 text-muted-foreground" />
				<span className="text-sm text-muted-foreground">
					Channel Not Found
				</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col h-full">
			<ChannelHeader title={channel.name} />
			<div className="flex-1">{JSON.stringify(results)}</div>
			<ChatInput placeholder={`Message # ${channel.name}`} />
		</div>
	);
};

export default ChannelIdPage;
