import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Toolbar = () => {
	return (
		<nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
			<div className="flex-1" />
			<div className="min-w-[280px] max-w-[642px] grow-[2] shrink">
				<Button
					size="sm"
					className="bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2"
				>
					<SearchIcon className="size-4 text-white mr-2" />
					<span className="text-white text-xs">Search Workspace</span>
				</Button>
			</div>
		</nav>
	);
};
