import {
	MessageSquareTextIcon,
	PencilIcon,
	SmileIcon,
	Trash2Icon,
} from "lucide-react";

import { Button } from "../ui/button";

interface ToolbarProps {
	isAuthor: boolean;
	isPending: boolean;
	handleEdit: () => void;
	handleThread: () => void;
	handleDelete: () => void;
	handleReaction: (value: string) => void;
	hideThreadButton?: boolean;
}

export const Toolbar = ({
	isAuthor,
	isPending,
	handleEdit,
	handleThread,
	handleDelete,
	handleReaction,
	hideThreadButton,
}: ToolbarProps) => {
	return (
		<div className="absolute top-0 right-5">
			<div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm">
				<Button variant="ghost" size="iconSm" disabled={isPending}>
					<SmileIcon className="size-4" />
				</Button>
				<Button variant="ghost" size="iconSm" disabled={isPending}>
					<MessageSquareTextIcon className="size-4" />
				</Button>
				<Button variant="ghost" size="iconSm" disabled={isPending}>
					<PencilIcon className="size-4" />
				</Button>
				<Button variant="ghost" size="iconSm" disabled={isPending}>
					<Trash2Icon className="size-4" />
				</Button>
			</div>
		</div>
	);
};
