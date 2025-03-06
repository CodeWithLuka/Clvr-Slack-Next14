import { AlertTriangleIcon, LoaderIcon, XIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Message } from "@/components/custom/message";

import { Button } from "@/components/ui/button";

import { useCurrentMember } from "@/features/members/api/use-current-member";

import { useGenerateUploadUrl } from "@/features/upload/api/use-generate-upload-url";

import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { Id } from "../../../../convex/_generated/dataModel";

import { useGetMessage } from "../api/use-get-message";
import { useCreateMessage } from "../api/use-create-message";

const Editor = dynamic(() => import("@/components/custom/editor"), {
	ssr: false,
});

interface ThreadProps {
	messageId: Id<"messages">;
	onClose: () => void;
}

type CreateMessageValues = {
	channelId: Id<"channels">;
	workspaceId: Id<"workspaces">;
	parentMessageId: Id<"messages">;
	body: string;
	image: Id<"_storage"> | undefined;
};

export const Thread = ({ messageId, onClose }: ThreadProps) => {
	const channelId = useChannelId();
	const workspaceId = useWorkspaceId();

	const [editingId, setEditingId] = useState<Id<"messages"> | null>(null);
	const [editorKey, setEditorKey] = useState<number>(0);
	const [isPending, setIsPending] = useState<boolean>(false);

	const editorRef = useRef<Quill | null>(null);

	const { mutate: createMessage } = useCreateMessage();
	const { mutate: generateUploadUrl } = useGenerateUploadUrl();

	const { data: currentMember } = useCurrentMember({ workspaceId });

	const { data: message, isLoading: loadingMessage } = useGetMessage({
		id: messageId,
	});

	const handleSubmit = async ({
		body,
		image,
	}: {
		body: string;
		image: File | null;
	}) => {
		try {
			setIsPending(true);
			editorRef?.current?.enable(false);

			const values: CreateMessageValues = {
				channelId,
				workspaceId,
				parentMessageId: messageId,
				body,
				image: undefined,
			};

			if (image) {
				const url = await generateUploadUrl({}, { throwError: true });

				if (!url) {
					throw new Error("ImageURL Not Found");
				}

				const result = await fetch(url, {
					method: "POST",
					headers: { "Content-Type": image.type },
					body: image,
				});

				if (!result.ok) {
					throw new Error("Failed To Upload Image");
				}

				const { storageId } = await result.json();

				values.image = storageId;
			}

			await createMessage(values, { throwError: true });

			setEditorKey((prevKey) => prevKey + 1);
		} catch (error) {
			toast.error("Failed To Send Message");
		} finally {
			setIsPending(false);
			editorRef?.current?.enable(true);
		}
	};

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
					isEditing={editingId === message._id}
					setEditingId={setEditingId}
				/>
			</div>
			<div className="px-4">
				<Editor
					onSubmit={() => {}}
					disabled={false}
					placeholder="Reply . . ."
				/>
			</div>
		</div>
	);
};
