import { AlertTriangleIcon, LoaderIcon, XIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { Id } from "../../../../convex/_generated/dataModel";

import { useGetMember } from "../api/use-get-member";

interface ProfileProps {
	memberId: Id<"members">;
	onClose: () => void;
}

export const Profile = ({ memberId, onClose }: ProfileProps) => {
	const { data: member, isLoading: isLoadingMember } = useGetMember({
		id: memberId,
	});

	if (isLoadingMember) {
		return (
			<div className="h-full flex flex-col">
				<div className="flex justify-between items-center h-[49px] px-4 border-b">
					<p className="text-lg font-bold">Profile</p>
					<Button onClick={onClose} size="iconSm" variant="ghost">
						<XIcon className="size-5 stroke-[1.5]" />
					</Button>
				</div>
				<div className="flex flex-col gap-y-2 h-full items-center justify-center">
					<LoaderIcon className="size-5 animate-spin text-muted-foreground" />
				</div>
			</div>
		);
	}

	if (!member) {
		return (
			<div className="h-full flex flex-col">
				<div className="flex justify-between items-center h-[49px] px-4 border-b">
					<p className="text-lg font-bold">Profile</p>
					<Button onClick={onClose} size="iconSm" variant="ghost">
						<XIcon className="size-5 stroke-[1.5]" />
					</Button>
				</div>
				<div className="flex flex-col gap-y-2 h-full items-center justify-center">
					<AlertTriangleIcon className="size-5 text-muted-foreground" />
					<p className="text-sm text-muted-foreground">
						Profile Not Found
					</p>
				</div>
			</div>
		);
	}

	const avatarFallback = member.user.name?.[0] || "M";

	return (
		<div className="h-full flex flex-col">
			<div className="flex justify-between items-center h-[49px] px-4 border-b">
				<p className="text-lg font-bold">Profile</p>
				<Button onClick={onClose} size="iconSm" variant="ghost">
					<XIcon className="size-5 stroke-[1.5]" />
				</Button>
			</div>
			<div className="flex flex-col items-center justify-center p-4">
				<Avatar className="max-w-[256px] max-h-[256px] size-full">
					<AvatarImage src={member.user.image} />
					<AvatarFallback className="aspect-square">
						{avatarFallback}
					</AvatarFallback>
				</Avatar>
			</div>
		</div>
	);
};
