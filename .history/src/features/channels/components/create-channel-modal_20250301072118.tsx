import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { useCreateChannelModal } from "../store/use-create-channel-modal";

export const CreateChannelModal = () => {
	const [open, setOpen] = useCreateChannelModal();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add A Channel</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
