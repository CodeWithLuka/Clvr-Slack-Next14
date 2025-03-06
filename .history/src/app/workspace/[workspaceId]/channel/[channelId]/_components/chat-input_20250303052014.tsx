import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { useCreateMessage } from "@/features/messages/api/use-create-message";

import { useChannelId } from "@/hooks/use-channel-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const Editor = dynamic(() => import("@/components/custom/editor"), {
	ssr: false,
});

interface ChatInputProps {
	placeholder: string;
}

export const ChatInput = ({ placeholder }: ChatInputProps) => {
	const [editorKey, setEditorKey] = useState<number>(0);
	const [isPending, setIsPending] = useState<boolean>(false);

	const editorRef = useRef<Quill | null>(null);

	const workspaceId = useWorkspaceId();
	const channelId = useChannelId();
	const { mutate: createMessage } = useCreateMessage();

	const handleSubmit = async ({
		body,
		image,
	}: {
		body: string;
		image: File | null;
	}) => {
		try {
			setIsPending(true);
			await createMessage(
				{
					workspaceId,
					channelId,
					body,
				},
				{ throwError: true },
			);

			setEditorKey((prevKey) => prevKey + 1);
		} catch (error) {
			toast.error("Failed To Send Message");
		} finally {
			setIsPending(false);
		}
	};

	return (
		<div className="px-5 w-full">
			<Editor
				key={editorKey}
				placeholder={placeholder}
				onSubmit={handleSubmit}
				disabled={isPending}
				innerRef={editorRef}
				variant="create"
			/>
		</div>
	);
};
