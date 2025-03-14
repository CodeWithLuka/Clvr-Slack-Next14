import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Id } from "../../../../convex/_generated/dataModel";

interface ThreadProps {
	messageId: Id<"messages">;
	onClose: () => void;
}

export const Thread = ({ messageId, onClose }: ThreadProps) => {
	return (
		<div className="w-full flex flex-col">
			<div className="flex justify-between items-center h-[49px] px-4 border-b">
				<p className="text-lg font-bold">Thread</p>
				<Button onClick={onClose} size="iconSm" variant="ghost">
					<XIcon className="size-5 stroke-[1.5]" />
				</Button>
			</div>
		</div>
	);
};
