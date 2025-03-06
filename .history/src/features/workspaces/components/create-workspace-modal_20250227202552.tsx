import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useCreateWorkspace } from "../api/use-create-workspace";
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal";

export const CreateWorkspaceModal = () => {
	const router = useRouter();

	const [open, setOpen] = useCreateWorkspaceModal();
	const [name, setName] = useState<string>("");

	const { mutate, isPending } = useCreateWorkspace();

	const handleClose = () => {
		setOpen(false);

		setName("");
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		mutate(
			{ name },
			{
				onSuccess(id) {
					router.push(`/workspace/${id}`);
				},
			},
		);
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add A Workspace</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						disabled={isPending}
						onChange={(e) => setName(e.target.value)}
						value={name}
						required
						autoFocus
						minLength={3}
						placeholder="Enter Workspace Name e.g. 'Work', 'Personal', 'Home'"
					/>
					<div className="flex justify-end">
						<Button disabled={isPending}>Create</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
