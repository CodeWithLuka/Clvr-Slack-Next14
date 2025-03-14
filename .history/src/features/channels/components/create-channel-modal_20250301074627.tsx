import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useCreateChannelModal } from "../store/use-create-channel-modal";

export const CreateChannelModal = () => {
	const [open, setOpen] = useCreateChannelModal();

	const [name, setName] = useState<string>("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\s+/g, "-").toLowerCase();

		setName(value);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add A Channel</DialogTitle>
				</DialogHeader>
				<form className="space-y-4">
					<Input
						value={name}
						disabled={false}
						onChange={handleChange}
						required
						autoFocus
						minLength={3}
						maxLength={80}
						placeholder="e.g plan-budget"
					/>
					<div className="flex justify-end">
						<Button disabled={false}>Create</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};
