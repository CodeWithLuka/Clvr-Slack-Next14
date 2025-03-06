"use client";

import { LoaderIcon, TriangleAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";
import { useGetChannels } from "@/features/channels/api/use-get-channels";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

const WorkspaceIdPage = () => {
	const router = useRouter();
	const workspaceId = useWorkspaceId();
	const [open, setOpen] = useCreateChannelModal();

	const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
		id: workspaceId,
	});

	const { data: channels, isLoading: channelsLoading } = useGetChannels({
		workspaceId,
	});

	const channelId = useMemo(() => channels?.[0]?._id, [channels]);

	useEffect(() => {
		if (workspaceLoading || channelsLoading || !workspace) return;

		if (channelId) {
			router.push(`/workspace/${workspaceId}/channel/${channelId}`);
		} else if (!open) {
			setOpen(true);
		}
	}, [
		channelId,
		channelsLoading,
		open,
		router,
		setOpen,
		workspace,
		workspaceId,
		workspaceLoading,
	]);

	if (workspaceLoading || channelsLoading) {
		return (
			<div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
				<LoaderIcon className="size-6 animate-spin text-muted-foreground" />
			</div>
		);
	}

	if (!workspace) {
		<div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
			<TriangleAlertIcon className="size-6 animate-spin text-muted-foreground" />
			<span className="text-sm text-muted-foreground">
				Workspace Not Found
			</span>
		</div>;
	}

	return null;
};

export default WorkspaceIdPage;
