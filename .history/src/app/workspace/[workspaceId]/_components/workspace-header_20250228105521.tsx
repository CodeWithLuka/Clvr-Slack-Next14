import { ChevronDownIcon, ListFilterIcon, SquarePenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Doc } from "../../../../../convex/_generated/dataModel";
import { Hint } from "@/components/custom/hint";

interface WorkspaceHeaderProps {
	workspace: Doc<"workspaces">;
	isAdmin: boolean;
}

export const WorkspaceHeader = ({
	workspace,
	isAdmin,
}: WorkspaceHeaderProps) => {
	return (
		<div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="transparent"
						className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
						size="sm"
					>
						<span className="truncate">{workspace.name}</span>
						<ChevronDownIcon className="size-4 ml-1 shrink-0" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					side="bottom"
					align="start"
					className="w-64"
				>
					<DropdownMenuItem className="cursor-pointer capitalize">
						<div className="size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2">
							{workspace.name.charAt(0).toUpperCase()}
						</div>
						<div className="flex flex-col items-start">
							<p className="font-bold">{workspace.name}</p>
							<p className="text-xs text-muted-foreground">
								Active Workspace
							</p>
						</div>
					</DropdownMenuItem>
					{isAdmin && (
						<>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="cursor-pointer py-3"
								onClick={() => {}}
							>
								Invite People To {workspace.name}
							</DropdownMenuItem>
							<DropdownMenuItem
								className="cursor-pointer py-3"
								onClick={() => {}}
							>
								Preferences
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
			<div className="flex items-center gap-0.5">
				<Hint label="Filter Chats" side="bottom">
					<Button variant="transparent" size="iconSm">
						<ListFilterIcon className="size-4" />
					</Button>
				</Hint>
				<Hint label="New Message" side="bottom">
					<Button variant="transparent" size="iconSm">
						<SquarePenIcon className="size-4" />
					</Button>
				</Hint>
			</div>
		</div>
	);
};
