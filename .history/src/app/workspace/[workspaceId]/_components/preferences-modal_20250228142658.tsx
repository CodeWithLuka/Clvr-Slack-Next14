import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogClose,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useRemoveWorkspace } from "@/features/workspaces/api/use-remove-workspace";

import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";

import { useWorkspaceId } from "@/hooks/use-workspace-id";

interface PreferencesModalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	initialValue: string;
}

export const PreferencesModal = ({
	open,
	setOpen,
	initialValue,
}: PreferencesModalProps) => {
	const workspaceId = useWorkspaceId();

	const router = useRouter();

	const [value, setValue] = useState<string>(initialValue);

	const [editOpen, setEditOpen] = useState<boolean>(false);

	const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
		useUpdateWorkspace();

	const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
		useRemoveWorkspace();

	const handleRemove = () => {
		removeWorkspace(
			{
				id: workspaceId,
			},
			{
				onSuccess: () => {
					toast.success(`${value} Workspace Deleted Successfully`);
					router.replace("/");
				},
				onError: () => {
					toast.error("Failed To Delete Workspace");
				},
			},
		);
	};

	const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		updateWorkspace(
			{
				id: workspaceId,
				name: value,
			},
			{
				onSuccess: () => {
					toast.success(
						`Workspace Name Updated Successfully To ${value}`,
					);
					setEditOpen(false);
				},
				onError: () => {
					toast.error("Failed To Update Workspace");
				},
			},
		);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="p-0 bg-gray-50 overflow-hidden">
				<DialogHeader className="p-4 border-b bg-white">
					<DialogTitle>{value}</DialogTitle>
				</DialogHeader>
				<div className="px-4 pb-4 flex flex-col gap-y-2">
					<Dialog open={editOpen} onOpenChange={setEditOpen}>
						<DialogTrigger asChild>
							<div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
								<div className="flex items-center justify-between">
									<p className="text-sm font-semibold">
										Workspace Name
									</p>
									<p className="text-sm text-[#1264A3] hover:underline font-semibold">
										Edit
									</p>
								</div>
								<p className="text-sm">{value}</p>
							</div>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Edit Workspace Name</DialogTitle>
							</DialogHeader>
							<form className="space-y-4" onSubmit={handleEdit}>
								<Input
									value={value}
									disabled={isUpdatingWorkspace}
									onChange={(e) => setValue(e.target.value)}
									required
									autoFocus
									minLength={3}
									maxLength={80}
									placeholder="Enter Workspace Name e.g. 'Work', 'Personal', 'Home'"
								/>
								<DialogFooter>
									<DialogClose asChild>
										<Button disabled={isUpdatingWorkspace}>
											Cancel
										</Button>
									</DialogClose>
									<Button disabled={isUpdatingWorkspace}>
										Save
									</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
					<button
						className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
						disabled={isRemovingWorkspace}
						onClick={handleRemove}
					>
						<Trash2Icon className="size-4" />
						<p className="text-sm font-semibold">
							Delete Workspace
						</p>
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
};
