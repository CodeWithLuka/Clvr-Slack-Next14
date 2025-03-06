import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface EmojiPopoverProps {
	children: React.ReactNode;
	hint?: string;
	onEmojiSelect: (emoji: any) => void;
}

export const EmojiPopover = ({
	children,
	hint,
	onEmojiSelect,
}: EmojiPopoverProps) => {
	return (
		<div>
			<div>{children}</div>
		</div>
	);
};
