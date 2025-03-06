import { Trash2Icon } from "lucide-react";
import { useState } from "react";

import {
	Dialog,
	DialogContent,
	DialogClose,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { useUpdateWorkspace } from "@/features/workspaces/api/use-update-workspace";

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
	const [value, setValue] = useState<string>(initialValue);

	const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
		useUpdateWorkspace();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="p-0 bg-gray-50 overflow-hidden">
				<DialogHeader className="p-4 border-b bg-white">
					<DialogTitle>{value}</DialogTitle>
				</DialogHeader>
				<div className="px-4 pb-4 flex flex-col gap-y-2">
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
					<button
						className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
						disabled={false}
						onClick={() => {}}
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
