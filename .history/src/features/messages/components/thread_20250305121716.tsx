import { Id } from "../../../../convex/_generated/dataModel";

interface ThreadProps {
	messageId: Id<"messages">;
	onClose: () => void;
}

export const Thread = ({ messageId, onClose }: ThreadProps) => {
	return (
		<div>
			<h1>Thread Ins</h1>
		</div>
	);
};
