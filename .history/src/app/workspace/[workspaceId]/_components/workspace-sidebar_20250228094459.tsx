import { AlertTriangleIcon, LoaderIcon } from "lucide-react";

import { useCurrentMember } from "@/features/members/api/use-current-member";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { WorkspaceHeader } from "./workspace-header";

export const WorkspaceSidebar = () => {
	const workspaceId = useWorkspaceId();

	const { data: member, isLoading: memberLoading } = useCurrentMember({
		workspaceId,
	});

	const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
		id: workspaceId,
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
			<WorkspaceHeader />
		</div>
	);
};
