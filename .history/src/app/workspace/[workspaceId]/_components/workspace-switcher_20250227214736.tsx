import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const WorkspaceSwitcher = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button className="size-9 relative overflow-hidden bg-[#ABABAB] hover:bg-[#ABABAB]/80 text-slate-800 font-semibold text-xl">
					A
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				side="bottom"
				align="start"
				className="w-64"
			></DropdownMenuContent>
		</DropdownMenu>
	);
};
