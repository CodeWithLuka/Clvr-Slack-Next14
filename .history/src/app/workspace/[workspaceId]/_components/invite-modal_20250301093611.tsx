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
					<DialogTitle>Invite People To {name}</DialogTitle>
					<DialogDescription>
						Use the code below to invite people to {name}
					</DialogDescription>
				</DialogHeader>
				<div
					className="flex flex-col gap-y-4
                 items-center justify-center py-10"
				>
					<p>{joinCode}</p>
				</div>
			</DialogContent>
		</Dialog>
	);
};
