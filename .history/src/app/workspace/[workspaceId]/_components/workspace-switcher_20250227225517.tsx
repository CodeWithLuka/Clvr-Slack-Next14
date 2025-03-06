import { LoaderIcon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

export const WorkspaceSwitcher = () => {
	const router = useRouter();
	const workspaceId = useWorkspaceId();
	const [_open, setOpen] = useCreateWorkspaceModal();

	const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
		id: workspaceId,
	});
	const { data: workspaces, isLoading: workspacesLoading } =
		useGetWorkspaces();

	const filteredWorkspaces = workspaces?.filter(
		(workspace) => workspace?._id !== workspaceId,
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button className="size-9 relative overflow-hidden bg-[#ABABAB] hover:bg-[#ABABAB]/80 text-slate-800 font-semibold text-xl">
					{workspaceLoading ? (
						<LoaderIcon className="size-5 animate-spin shrink-0" />
					) : (
						workspace?.name.charAt(0).toUpperCase()
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="bottom" align="start" className="w-64">
				<DropdownMenuItem
					onClick={() => router.push(`/workspace/${workspaceId}`)}
					className="cursor-pointer flex-col justify-start items-center capitalize"
				>
					{workspace?.name}
					<span className="text-xs text-muted-foreground">
						Active Workspace
					</span>
				</DropdownMenuItem>
				{filteredWorkspaces?.map((workspace) => (
					<DropdownMenuItem
						key={workspace._id}
						className="cursor-pointer capitalize"
						onClick={() =>
							router.push(`/workspace/${workspace._id}`)
						}
					>
						<div className="size-9 shrink-0 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
							{workspace.name.charAt(0).toUpperCase()}
						</div>
						<p className="truncate">{workspace.name}</p>
					</DropdownMenuItem>
				))}
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={() => setOpen(true)}
				>
					<div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-xl rounded-md flex items-center justify-center mr-2">
						<PlusIcon />
					</div>
					Create A New Workspace
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
