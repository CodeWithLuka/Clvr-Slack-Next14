import { ImageIcon, SmileIcon } from "lucide-react";
import Quill, { type QuillOptions } from "quill";
import { Delta, Op } from "quill/core";
import {
	MutableRefObject,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { MdSend } from "react-icons/md";
import { PiTextAa } from "react-icons/pi";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Hint } from "./hint";

import "quill/dist/quill.snow.css";

type EditorValue = {
	image: File | null;
	body: string;
};

interface EditorProps {
	onSubmit: ({ image, body }: EditorValue) => void;
	onCancel?: () => void;
	placeholder?: string;
	defaultValue?: Delta | Op[];
	disabled?: boolean;
	innerRef?: MutableRefObject<Quill | null>;
	variant?: "create" | "update";
}

const Editor = ({
	onSubmit,
	onCancel,
	placeholder = "Write Something. . .",
	defaultValue = [],
	disabled = false,
	innerRef,
	variant = "create",
}: EditorProps) => {
	const [text, setText] = useState<string>("");

	const submitRef = useRef(onSubmit);
	const placeholderRef = useRef(placeholder);
	const quillRef = useRef<Quill | null>(null);
	const defaultValueRef = useRef(defaultValue);
	const containerRef = useRef<HTMLDivElement>(null);
	const disabledRef = useRef(disabled);

	useLayoutEffect(() => {
		submitRef.current = onSubmit;
		placeholderRef.current = placeholder;
		defaultValueRef.current = defaultValue;
		disabledRef.current = disabled;
	});

	useEffect(() => {
		if (!containerRef.current) return;

		const container = containerRef.current;

		const editorContainer = container.appendChild(
			container.ownerDocument.createElement("div"),
		);

		const options: QuillOptions = {
			theme: "snow",
			placeholder: placeholderRef.current,
		};

		const quill = new Quill(editorContainer, options);

		quillRef.current = quill;
		quillRef.current.focus();

		if (innerRef) {
			innerRef.current = quill;
		}

		quill.setContents(defaultValueRef.current);
		setText(quill.getText());

		quill.on(Quill.events.TEXT_CHANGE, () => {
			setText(quill.getText());
		});

		return () => {
			quill.off(Quill.events.TEXT_CHANGE);
			if (container) {
				container.innerHTML = "";
			}
			if (quillRef.current) {
				quillRef.current = null;
			}
			if (innerRef) {
				innerRef.current = null;
			}
		};
	}, [innerRef]);

	const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

	console.log({ isEmpty, text });

	return (
		<div className="flex flex-col">
			<div className="flex flex-col border border-slate-200 rounded-md overflow-hidden focus-within:border-slate-300 focus-within:shadow-sm transition bg-white">
				<div ref={containerRef} className="h-full q-custom" />
				<div className="flex px-2 pb-2 z-[5]">
					<Hint label="Hide Formatting">
						<Button
							disabled={false}
							size="iconSm"
							variant="ghost"
							onClick={() => {}}
						>
							<PiTextAa className="size-4" />
						</Button>
					</Hint>
					<Hint label="Emoji">
						<Button
							disabled={false}
							size="iconSm"
							variant="ghost"
							onClick={() => {}}
						>
							<SmileIcon className="size-4" />
						</Button>
					</Hint>
					{variant === "create" && (
						<Hint label="Image">
							<Button
								disabled={false}
								size="iconSm"
								variant="ghost"
								onClick={() => {}}
							>
								<ImageIcon className="size-4" />
							</Button>
						</Hint>
					)}
					{variant === "update" && (
						<div className="ml-auto flex items-center gap-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => {}}
								disabled={false}
								className="ml-auto bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
							>
								Cancel
							</Button>
							<Button
								disabled={false}
								onClick={() => {}}
								size="sm"
							>
								Save
							</Button>
						</div>
					)}
					{variant === "create" && (
						<Button
							size="iconSm"
							disabled={disabled || isEmpty}
							onClick={() => {}}
							className={cn(
								"ml-auto",
								isEmpty
									? "bg-white hover:bg-white/80 text-muted-foreground"
									: "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white",
							)}
						>
							<MdSend className="size-4" />
						</Button>
					)}
				</div>
			</div>
			<div className="p-2 text-[10px] text-muted-foreground flex justify-end">
				<p>
					<strong>Shift + Enter</strong> To Add A New Line
				</p>
			</div>
		</div>
	);
};

export default Editor;
