interface InviteModalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export const InviteModal = ({ open, setOpen }: InviteModalProps) => {
	return (
		<div>
			<h1>InviteModal</h1>
		</div>
	);
};
