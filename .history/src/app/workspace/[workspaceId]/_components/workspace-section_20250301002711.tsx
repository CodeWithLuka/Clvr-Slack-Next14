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
				<Button>
					<FaCaretDown />
				</Button>
			</div>
			{children}
		</div>
	);
};
