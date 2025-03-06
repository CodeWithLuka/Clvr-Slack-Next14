import { useCurrentMember } from "@/features/members/api/use-current-member";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { cn } from "@/lib/utils";

import { Doc, Id } from "../../../convex/_generated/dataModel";

interface ReactionsProps {
	data: Array<
		Omit<Doc<"reactions">, "memberId"> & {
			count: number;
			memberIds: Id<"members">[];
		}
	>;
	onChange: (value: string) => void;
}

export const Reactions = ({ data, onChange }: ReactionsProps) => {
	const workspaceId = useWorkspaceId();
	const { data: currentMember } = useCurrentMember({ workspaceId });

	const currentMemberId = currentMember?._id;

	if (data.length === 0 || !currentMemberId) {
		return null;
	}

	return (
		<div className="flex items-center gap-1 mt-1 mb-1">
			{data.map((reaction) => (
				<button
					key={reaction._id}
					className={cn(
						"h-6 px-2 rounded-full bg-slate-200/70 border border-transparent text-slate-800 flex items-center gap-x-1",
					)}
				>
					{reaction.value}
					<span>{reaction.count}</span>
				</button>
			))}
		</div>
	);
};
