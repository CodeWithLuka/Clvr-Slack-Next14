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
				</div>
			</DialogContent>
		</Dialog>
	);
};
