import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ConversationHeaderProps {
	memberName?: string;
	memberImage?: string;
	onClick?: () => void;
}

export const ConversationHeader = ({
	memberName = "Member",
	memberImage,
	onClick,
}: ConversationHeaderProps) => {
	const avatarFallback = memberName.charAt(0).toUpperCase();

	return (
		<div className="bg-white border-b h-[49px] flex items-center px-4 overflow-hidden">
			<Button
				variant="ghost"
				className="text-lg font-semibold px-2 overflow-hidden w-auto"
				size="sm"
				onClick={onClick}
			>
				<Avatar className="size-6 mr-2">
					<AvatarImage src={memberImage} />
					<AvatarFallback>{avatarFallback}</AvatarFallback>
				</Avatar>
				<span className="truncate">{memberName}</span>
			</Button>
		</div>
	);
};
