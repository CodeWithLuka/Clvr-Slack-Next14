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

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-item";
import { WorkspaceSection } from "./workspace-section";

export const WorkspaceSidebar = () => {
	const workspaceId = useWorkspaceId();

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
				onNew={() => {}}
			>
				{channels?.map((item) => (
					<SidebarItem
						key={item._id}
						icon={HashIcon}
						label={item.name}
						id={item._id}
					/>
				))}
			</WorkspaceSection>
			{members?.map((item) => <div key={item._id}>{item.user.name}</div>)}
		</div>
	);
};
