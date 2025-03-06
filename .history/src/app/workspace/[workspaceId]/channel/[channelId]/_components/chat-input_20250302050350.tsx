import dynamic from "next/dynamic";
import Quill from "quill";
import { useRef } from "react";

const Editor = dynamic(() => import("@/components/custom/editor"), {
	ssr: false,
});

export const ChatInput = () => {
	const editorRef = useRef<Quill | null>(null);

	return (
		<div className="px-5 w-full">
			<Editor
				placeholder="Luka Suave"
				onSubmit={() => {}}
				disabled={false}
				innerRef={editorRef}
				variant="create"
			/>
		</div>
	);
};
