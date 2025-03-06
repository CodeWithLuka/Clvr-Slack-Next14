import { Id } from "../../../../../../../convex/_generated/dataModel";

interface ConversationProps {
	id: Id<"conversations">;
}

export const Conversation = ({ id }: ConversationProps) => {
	return (
		<div>
			<h1>ConversationId: {id}</h1>
		</div>
	);
};
