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
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{value}</DialogTitle>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};
