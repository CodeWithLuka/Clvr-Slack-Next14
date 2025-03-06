"use client";

import { LoaderIcon, TriangleAlertIcon } from "lucide-react";

import { useGetChannel } from "@/features/channels/api/use-get-channel";
import { useChannelId } from "@/hooks/use-channel-id";

const ChannelIdPage = () => {
	const channelId = useChannelId();

	const { data: channel, isLoading: channelLoading } = useGetChannel({
		id: channelId,
	});

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
		<div>
			<h1>ChannelIdPage</h1>
		</div>
	);
};

export default ChannelIdPage;
