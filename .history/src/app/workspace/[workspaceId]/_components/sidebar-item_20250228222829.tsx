import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

interface SidebarItemProps {
	label: string;
	id: string;
	icon: LucideIcon | IconType;
}

export const SidebarItem = ({ label, id, icon: Icon }: SidebarItemProps) => {
	const workspaceId = useWorkspaceId();

	return (
		<Button asChild size="sm" variant="transparent">
			<Link href={`/workspace/${workspaceId}/channel/${id}`}>
				<Icon />
				<span>{label}</span>
			</Link>
		</Button>
	);
};
