import { FaCaretDown } from "react-icons/fa";

import { Button } from "@/components/ui/button";

interface WorkspaceSectionProps {
	label: string;
	hint: string;
	onNew?: () => void;
	children: React.ReactNode;
}

export const WorkspaceSection = ({
	label,
	hint,
	onNew,
	children,
}: WorkspaceSectionProps) => {
	return (
		<div className="flex flex-col mt-3 px-2">
			<div className="flex items-center px-3.5 group">
				<Button
					variant="transparent"
					className="p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6"
				>
					<FaCaretDown className="size-4" />
				</Button>
				<Button
					variant="transparent"
					size="sm"
					className="group px-1.5 text-sm text-[#f9edffcc] h-[28px] justify-start overflow-hidden items-center"
				>
					<span className="truncate">{label}</span>
				</Button>
			</div>
			{children}
		</div>
	);
};
