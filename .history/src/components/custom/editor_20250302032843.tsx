import { ImageIcon, SmileIcon } from "lucide-react";
import Quill, { type QuillOptions } from "quill";
import { useEffect, useRef } from "react";
import { PiTextAa } from "react-icons/pi";

import { Button } from "@/components/ui/button";

import "quill/dist/quill.snow.css";

const Editor = () => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;

		const editorContainer = container.appendChild(
			container.ownerDocument.createElement("div"),
		);

		const options: QuillOptions = {
			theme: "snow",
		};

		new Quill(editorContainer, options);

		return () => {
			if (container) {
				container.innerHTML = "";
			}
		};
	}, []);

	return (
		<div className="flex flex-col">
			<div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
				<div ref={containerRef} className="h-full q-custom" />
				<div className="flex px-2 pb-2 z-[5]">
					<Button
						disabled={false}
						size="iconSm"
						variant="ghost"
						onClick={() => {}}
					>
						<PiTextAa className="size-4" />
					</Button>
					<Button
						disabled={false}
						size="iconSm"
						variant="ghost"
						onClick={() => {}}
					>
						<SmileIcon className="size-4" />
					</Button>
					<Button
						disabled={false}
						size="iconSm"
						variant="ghost"
						onClick={() => {}}
					>
						<ImageIcon className="size-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Editor;
