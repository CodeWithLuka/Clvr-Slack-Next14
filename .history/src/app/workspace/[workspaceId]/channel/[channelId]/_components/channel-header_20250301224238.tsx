import { FaChevronDown } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface ChannelHeaderProps {
	title: string;
}

export const ChannelHeader = ({ title }: ChannelHeaderProps) => {
	return (
		<div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
			<Dialog>
				<DialogTrigger asChild>
					<Button
						variant="ghost"
						className="text-lg font-semibold px-2 overflow-hidden w-auto"
						size="sm"
					>
						<span className="truncate"># {title}</span>
						<FaChevronDown className="size-2.5 ml-2" />
					</Button>
				</DialogTrigger>
				<DialogContent className="p-0 bg-gray-50 overflow-hidden">
					<DialogHeader className="p-4 border-b bg-white">
						<DialogTitle># {title}</DialogTitle>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};
