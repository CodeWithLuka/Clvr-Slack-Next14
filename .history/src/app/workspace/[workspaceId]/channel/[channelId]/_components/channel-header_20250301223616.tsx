import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";

interface ChannelHeaderProps {
	title: string;
}

export const ChannelHeader = ({ title }: ChannelHeaderProps) => {
	return (
		<div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
			<Button
				variant="ghost"
				className="text-lg font-semibold px-2 overflow-hidden w-auto"
				size="sm"
			>
				<span className="truncate"># {title}</span>
				<FaChevronDown />
			</Button>
		</div>
	);
};
