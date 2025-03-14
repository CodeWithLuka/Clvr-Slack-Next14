import {
	AlertTriangleIcon,
	HashIcon,
	LoaderIcon,
	MessageSquareTextIcon,
	SendHorizontalIcon,
} from "lucide-react";

import { useGetChannels } from "@/features/channels/api/use-get-channels";

import { useCurrentMember } from "@/features/members/api/use-current-member";
import { useGetMembers } from "@/features/members/api/use-get-members";

import { useCreateChannelModal } from "@/features/channels/store/use-create-channel-modal";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

import { useChannelId } from "@/hooks/use-channel-id";
import { useMemberId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { SidebarItem } from "./sidebar-item";
import { WorkspaceHeader } from "./workspace-header";
import { WorkspaceSection } from "./workspace-section";
import { UserItem } from "./user-item";

export const WorkspaceSidebar = () => {
	const channelId = useChannelId();
	const memberId = useMemberId();
	const workspaceId = useWorkspaceId();

	const [_open, setOpen] = useCreateChannelModal();

	const { data: member, isLoading: memberLoading } = useCurrentMember({
		workspaceId,
	});

	const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
		id: workspaceId,
	});

	const { data: channels, isLoading: channelsLoading } = useGetChannels({
		workspaceId,
	});

	const { data: members, isLoading: membersLoading } = useGetMembers({
		workspaceId,
	});

	if (memberLoading || workspaceLoading) {
		return (
			<div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
				<LoaderIcon className="size-5 animate-spin text-white" />
			</div>
		);
	}

	if (!member || !workspace) {
		return (
			<div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full items-center justify-center">
				<AlertTriangleIcon className="size-5 text-white" />
				<p className="text-white text-sm">Workspace Not Found</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col bg-[#5E2C5F] h-full">
			<WorkspaceHeader
				workspace={workspace}
				isAdmin={member.role === "admin"}
			/>
			<div className="flex flex-col px-2 mt-3">
				<SidebarItem
					label="Threads"
					icon={MessageSquareTextIcon}
					id="threads"
				/>
				<SidebarItem
					label="Drafts & Sent"
					icon={SendHorizontalIcon}
					id="drafts-sent"
				/>
			</div>
			<WorkspaceSection
				label="Channels"
				hint="New Channel"
				onNew={
					member.role === "admin" ? () => setOpen(true) : undefined
				}
			>
				{channels?.map((item) => (
					<SidebarItem
						key={item._id}
						icon={HashIcon}
						label={item.name}
						id={item._id}
						variant={channelId === item._id ? "active" : "default"}
					/>
				))}
			</WorkspaceSection>
			<WorkspaceSection
				label="Direct Messages"
				hint="New Direct Message"
				onNew={() => {}}
			>
				{members?.map((item) => (
					<UserItem
						key={item._id}
						id={item._id}
						label={item.user.name}
						image={item.user.image}
						variant={item._id === memberId ? "active" : "default"}
					/>
				))}
			</WorkspaceSection>
		</div>
	);
};
