import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

import { Button } from "@/components/ui/button";

interface SidebarButtonProps {
	iron: LucideIcon | IconType;
	label: string;
	isActive: boolean;
}

export const SidebarButton = ({
	iron,
	isActive,
	label,
}: SidebarButtonProps) => {
	return (
		<div className="flex flex-col items-center justify-center gap-y-0.5 cursor-pointer group">
			<Button></Button>
		</div>
	);
};
