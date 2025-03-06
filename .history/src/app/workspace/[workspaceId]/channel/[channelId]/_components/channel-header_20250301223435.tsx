import { Button } from "@/components/ui/button";

interface ChannelHeaderProps {
	title: string;
}

export const ChannelHeader = ({ title }: ChannelHeaderProps) => {
	return (
		<div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
			<Button>
				<span># {title}</span>
			</Button>
		</div>
	);
};
