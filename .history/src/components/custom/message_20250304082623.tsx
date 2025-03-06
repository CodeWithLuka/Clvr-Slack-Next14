import dynamic from "next/dynamic";

import { Doc, Id } from "../../../convex/_generated/dataModel";

const Renderer = dynamic(() => import("@/components/custom/renderer"), {
	ssr: false,
});

interface MessageProps {
	id: Id<"messages">;
	memberId: Id<"members">;
	authorImage?: string;
	authorName?: string;
	isAuthor: boolean;
	reactions: Array<
		Omit<Doc<"reactions">, "memberId"> & {
			count: number;
			memberIds: Id<"members">[];
		}
	>;
	body: Doc<"messages">["body"];
	image: string | null | undefined;
	createdAt: Doc<"messages">["_creationTime"];
	updatedAt: Doc<"messages">["updatedAt"];
	isEditing: boolean;
	isCompact?: boolean;
	setIsEditing: (id: Id<"messages"> | null) => void;
	hideThreadButton?: boolean;
	threadCount?: number;
	threadImage?: string;
	threadTimestamp?: number;
}

export const Message = ({
	id,
	memberId,
	authorImage,
	authorName = "Member",
	isAuthor,
	reactions,
	body,
	image,
	createdAt,
	updatedAt,
	isEditing,
	isCompact,
	setIsEditing,
	hideThreadButton,
	threadCount,
	threadImage,
	threadTimestamp,
}: MessageProps) => {
	return (
		<div className="flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative">
			<Renderer value={body} />
		</div>
	);
};
