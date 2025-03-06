import { AlertTriangleIcon, LoaderIcon, XIcon } from "lucide-react";

import { Message } from "@/components/custom/message";

import { Button } from "@/components/ui/button";

import { useCurrentMember } from "@/features/members/api/use-current-member";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { Id } from "../../../../convex/_generated/dataModel";

import { useGetMessage } from "../api/use-get-message";

interface ThreadProps {
	messageId: Id<"messages">;
	onClose: () => void;
}

export const Thread = ({ messageId, onClose }: ThreadProps) => {
	const workspaceId = useWorkspaceId();
	const { data: currentMember } = useCurrentMember({ workspaceId });

	const { data: message, isLoading: loadingMessage } = useGetMessage({
		id: messageId,
	});

	if (loadingMessage) {
		return (
			<div className="h-full flex flex-col">
				<div className="flex justify-between items-center h-[49px] px-4 border-b">
					<p className="text-lg font-bold">Thread</p>
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

	if (!message) {
		return (
			<div className="h-full flex flex-col">
				<div className="flex justify-between items-center h-[49px] px-4 border-b">
					<p className="text-lg font-bold">Thread</p>
					<Button onClick={onClose} size="iconSm" variant="ghost">
						<XIcon className="size-5 stroke-[1.5]" />
					</Button>
				</div>
				<div className="flex flex-col gap-y-2 h-full items-center justify-center">
					<AlertTriangleIcon className="size-5 text-muted-foreground" />
					<p className="text-sm text-muted-foreground">
						Message Not Found
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="h-full flex flex-col">
			<div className="flex justify-between items-center h-[49px] px-4 border-b">
				<p className="text-lg font-bold">Thread</p>
				<Button onClick={onClose} size="iconSm" variant="ghost">
					<XIcon className="size-5 stroke-[1.5]" />
				</Button>
			</div>
			<div>
				<Message
					hideThreadButton
					memberId={message.memberId}
					authorImage={message.user.image}
					authorName={message.user.name}
					isAuthor={message.memberId === currentMember?._id}
					body={message.body}
					image={message.image}
					createdAt={message._creationTime}
					updatedAt={message.updatedAt}
					id={message._id}
					reactions={message.reactions}
					isEditing={false}
					setEditingId={() => {}}
				/>
			</div>
		</div>
	);
};
