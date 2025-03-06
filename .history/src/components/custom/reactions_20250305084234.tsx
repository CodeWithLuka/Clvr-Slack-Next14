import { Doc, Id } from "../../../convex/_generated/dataModel";

interface ReactionsProps {
	data: Array<
		Omit<Doc<"reactions">, "memberId"> & {
			count: number;
			memberId: Id<"members">[];
		}
	>;
	onChange: (value: string) => void;
}

export const Reactions = ({ data, onChange }: ReactionsProps) => {};
