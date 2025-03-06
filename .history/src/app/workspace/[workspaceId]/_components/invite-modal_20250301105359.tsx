import { CopyIcon, RefreshCcwIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useNewJoinCode } from "@/features/workspaces/api/use-new-join-code";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";

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
	const workspaceId = useWorkspaceId();

	const [ConfirmDialog, confirm] = useConfirm(
		"Are You Sure?",
		"This will deactivate the current invite code and generate a new one",
	);

	const { mutate, isPending } = useNewJoinCode();

	const handleNewCode = async () => {
		const ok = await confirm();

		if (!ok) return;

		mutate(
			{ workspaceId },
			{
				onSuccess: () => {
					toast.success("New Invite Code Generated Successfully");
				},
				onError: () => {
					toast.error("Failed To Generate New Invite Code");
				},
			},
		);
	};

	const handleCopy = () => {
		const inviteLink = `${window.location.origin}/join/${workspaceId}`;

		navigator.clipboard
			.writeText(inviteLink)
			.then(() => toast.success("Invite Link Copied To Clipboard"));
	};

	return (
		<>
			<ConfirmDialog />
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
						<p className="text-4xl font-bold tracking-widest uppercase">
							{joinCode}
						</p>
						<Button onClick={handleCopy} variant="ghost" size="sm">
							Copy Invite Link
							<CopyIcon className="size-4 ml-2" />
						</Button>
					</div>
					<div className="flex items-center justify-between w-full">
						<Button
							disabled={isPending}
							onClick={handleNewCode}
							variant="outline"
						>
							New Code
							<RefreshCcwIcon className="size-4 ml-2" />
						</Button>
						<DialogClose asChild>
							<Button>Close</Button>
						</DialogClose>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
