import { format, isToday, isYesterday } from "date-fns";
import dynamic from "next/dynamic";
import { toast } from "sonner";

import { useRemoveMessage } from "@/features/messages/api/use-remove-message";
import { useUpdateMessage } from "@/features/messages/api/use-update-message";

import { useToggleReaction } from "@/features/reactions/api/use-toggle-reaction";

import { useConfirm } from "@/hooks/use-confirm";

import { cn } from "@/lib/utils";

import { Doc, Id } from "../../../convex/_generated/dataModel";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { Hint } from "./hint";
import { Reactions } from "./reactions";
import { Thumbnail } from "./thumbnail";
import { Toolbar } from "./toolbar";

const Renderer = dynamic(() => import("@/components/custom/renderer"), {
	ssr: false,
});

const Editor = dynamic(() => import("@/components/custom/editor"), {
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
	setEditingId: (id: Id<"messages"> | null) => void;
	hideThreadButton?: boolean;
	threadCount?: number;
	threadImage?: string;
	threadTimestamp?: number;
}

const formatFullTime = (date: Date) => {
	return `${isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, "MMM d, yyyy")} at ${format(date, "h:mm:ss a")}`;
};

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
	setEditingId,
	hideThreadButton,
	threadCount,
	threadImage,
	threadTimestamp,
}: MessageProps) => {
	const [ConfirmDialog, confirm] = useConfirm(
		"Delete Message",
		"Are You Sure You Want To Delete This Message",
	);

	const { mutate: updateMessage, isPending: isUpdatingMessage } =
		useUpdateMessage();
	const { mutate: removeMessage, isPending: isRemovingMessage } =
		useRemoveMessage();

	const { mutate: toggleReaction, isPending: isTogglingReaction } =
		useToggleReaction();

	const isPending = isUpdatingMessage;

	const handleReaction = (value: string) => {
		toggleReaction(
			{ messageId: id, value },
			{
				onError: () => {
					toast.error("Failed To Toggle Reaction");
				},
			},
		);
	};

	const handleRemove = async () => {
		const ok = await confirm();

		if (!ok) return;

		removeMessage(
			{ id },
			{
				onSuccess: () => {
					toast.success("Message Deleted Successfully");

					// TODO: Close Thread If Opened
				},
				onError: () => {
					toast.error("Failed To Delete Message");
				},
			},
		);
	};

	const handleUpdate = ({ body }: { body: string }) => {
		updateMessage(
			{ id, body },
			{
				onSuccess: () => {
					toast.success("Message Updated Successfully");
					setEditingId(null);
				},
				onError: () => {
					toast.error("Failed To Update Message");
				},
			},
		);
	};

	if (isCompact) {
		return (
			<>
				<ConfirmDialog />
				<div
					className={cn(
						"flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative",
						isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
						isRemovingMessage &&
							"bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200",
					)}
				>
					<div className="flex items-start gap-2">
						<Hint label={formatFullTime(new Date(createdAt))}>
							<button className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 w-[40px] leading-[22px] text-center hover:underline">
								{format(new Date(createdAt), "hh:mm")}
							</button>
						</Hint>
						{isEditing ? (
							<div className="w-full h-full">
								<Editor
									onSubmit={handleUpdate}
									disabled={isUpdatingMessage}
									defaultValue={JSON.parse(body)}
									onCancel={() => setEditingId(null)}
									variant="update"
								/>
							</div>
						) : (
							<div className="flex flex-col w-full">
								<Renderer value={body} />
								<Thumbnail url={image} />
								{updatedAt ? (
									<span className="text-xs text-muted-foreground">
										(edited)
									</span>
								) : null}
								{JSON.stringify(reactions)}
							</div>
						)}
					</div>
					{!isEditing && (
						<Toolbar
							isAuthor={isAuthor}
							isPending={isPending}
							handleEdit={() => setEditingId(id)}
							handleThread={() => {}}
							handleDelete={handleRemove}
							handleReaction={handleReaction}
							hideThreadButton={hideThreadButton}
						/>
					)}
				</div>
			</>
		);
	}

	const avatarFallback = authorName.charAt(0).toUpperCase();

	return (
		<>
			<ConfirmDialog />
			<div
				className={cn(
					"flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative",
					isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
					isRemovingMessage &&
						"bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200",
				)}
			>
				<div className="flex items-start gap-2">
					<button>
						<Avatar>
							<AvatarImage src={authorImage} />
							<AvatarFallback>{avatarFallback}</AvatarFallback>
						</Avatar>
					</button>
					{isEditing ? (
						<div className="w-full h-full">
							<Editor
								onSubmit={handleUpdate}
								disabled={isUpdatingMessage}
								defaultValue={JSON.parse(body)}
								onCancel={() => setEditingId(null)}
								variant="update"
							/>
						</div>
					) : (
						<div className="flex flex-col w-full overflow-hidden">
							<div className="text-sm">
								<button
									onClick={() => {}}
									className="font-bold text-primary hover:underline"
								>
									{authorName}
								</button>
								<span>&nbsp;&nbsp;</span>
								<Hint
									label={formatFullTime(new Date(createdAt))}
								>
									<button className="text-xs text-muted-foreground hover:underline">
										{format(new Date(createdAt), "h:mm a")}
									</button>
								</Hint>
							</div>
							<Renderer value={body} />
							<Thumbnail url={image} />
							{updatedAt ? (
								<span className="text-xs text-muted-foreground">
									(edited)
								</span>
							) : null}
							<Reactions
								data={reactions}
								onChange={handleReaction}
							/>
						</div>
					)}
				</div>
				{!isEditing && (
					<Toolbar
						isAuthor={isAuthor}
						isPending={isPending}
						handleEdit={() => setEditingId(id)}
						handleThread={() => {}}
						handleDelete={handleRemove}
						handleReaction={handleReaction}
						hideThreadButton={hideThreadButton}
					/>
				)}
			</div>
		</>
	);
};
