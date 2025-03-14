import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef, useState } from "react";

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

	const editorRef = useRef<Quill | null>(null);

	const workspaceId = useWorkspaceId();
	const channelId = useChannelId();
	const { mutate: createMessage } = useCreateMessage();

	const handleSubmit = ({
		body,
		image,
	}: {
		body: string;
		image: File | null;
	}) => {
		console.log({ body, image });
		createMessage({
			workspaceId,
			channelId,
			body,
		});

		setEditorKey((prevKey) => prevKey + 1);
	};

	return (
		<div className="px-5 w-full">
			<Editor
				key={editorKey}
				placeholder={placeholder}
				onSubmit={handleSubmit}
				disabled={false}
				innerRef={editorRef}
				variant="create"
			/>
		</div>
	);
};
