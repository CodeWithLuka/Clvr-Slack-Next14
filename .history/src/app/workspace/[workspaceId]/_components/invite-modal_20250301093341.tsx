import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface InviteModalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	name: string;
	joinCode: string;
}

export const InviteModal = ({
	open,
	setOpen,
	name,
	joinCode,
}: InviteModalProps) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite People To Your Workspace</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
