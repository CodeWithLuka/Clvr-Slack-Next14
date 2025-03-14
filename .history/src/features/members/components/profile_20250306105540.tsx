import {
	AlertTriangleIcon,
	ChevronDownIcon,
	LoaderIcon,
	MailIcon,
	XIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useConfirm } from "@/hooks/use-confirm";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

import { Id } from "../../../../convex/_generated/dataModel";

import { useCurrentMember } from "../api/use-current-member";
import { useGetMember } from "../api/use-get-member";
import { useRemoveMember } from "../api/use-remove-member";
import { useUpdateMember } from "../api/use-update-member";

interface ProfileProps {
	memberId: Id<"members">;
	onClose: () => void;
}

export const Profile = ({ memberId, onClose }: ProfileProps) => {
	const workspaceId = useWorkspaceId();

	const [UpdateDialog, confirmUpdate] = useConfirm(
		"Update Member's Role",
		"Are You Sure You Want To Update This Member's Role?",
	);

	const [LeaveDialog, confirmLeave] = useConfirm(
		"Leave Workspace",
		"Are You Sure You Want To Leave This Workspace?",
	);

	const [RemoveDialog, confirmRemove] = useConfirm(
		"Remove Member",
		"Are You Sure You Want To Remove This Member?",
	);

	const { data: member, isLoading: isLoadingMember } = useGetMember({
		id: memberId,
	});
	const { data: currentMember, isLoading: isLoadingCurrentMember } =
		useCurrentMember({ workspaceId });

	const { mutate: updateMember, isPending: isUpdatingMember } =
		useUpdateMember();

	const { mutate: removeMember, isPending: isRemovingMember } =
		useRemoveMember();

	const onRemove = async () => {
		const ok = await confirmRemove();

		if (!ok) return;

		removeMember(
			{ id: memberId },
			{
				onSuccess: () => {
					toast.success("Member Removed Successfully");
					onClose();
				},
				onError: () => {
					toast.error("Failed To Remove Member");
				},
			},
		);
	};

	const onLeave = async () => {
		const ok = await confirmLeave();

		if (!ok) return;

		removeMember(
			{ id: memberId },
			{
				onSuccess: () => {
					toast.success("You Have Successfully Left The Workspace");
					onClose();
				},
				onError: () => {
					toast.error("Failed To Leave Workspace");
				},
			},
		);
	};

	const onRoleUpdate = async (role: "admin" | "member") => {
		const ok = await confirmUpdate();

		if (!ok) return;

		updateMember(
			{ id: memberId, role },
			{
				onSuccess: () => {
					toast.success("Member Role Successfully Updated");
					onClose();
				},
				onError: () => {
					toast.error("Failed To Update Member Role");
				},
			},
		);
	};

	if (isLoadingMember || isLoadingCurrentMember) {
		return (
			<div className="h-full flex flex-col">
				<div className="flex justify-between items-center h-[49px] px-4 border-b">
					<p className="text-lg font-bold">Profile</p>
					<Button onClick={onClose} size="iconSm" variant="ghost">
						<XIcon className="size-5 stroke-[1.5]" />
					</Button>
				</div>
				<div className="flex flex-col gap-y-2 h-full items-center justify-center">
					<LoaderIcon className="size-5 animate-spin text-muted-foreground" />
				</div>
			</div>
		);
	}

	if (!member) {
		return (
			<div className="h-full flex flex-col">
				<div className="flex justify-between items-center h-[49px] px-4 border-b">
					<p className="text-lg font-bold">Profile</p>
					<Button onClick={onClose} size="iconSm" variant="ghost">
						<XIcon className="size-5 stroke-[1.5]" />
					</Button>
				</div>
				<div className="flex flex-col gap-y-2 h-full items-center justify-center">
					<AlertTriangleIcon className="size-5 text-muted-foreground" />
					<p className="text-sm text-muted-foreground">
						Profile Not Found
					</p>
				</div>
			</div>
		);
	}

	const avatarFallback = member.user.name?.[0] || "M";

	return (
		<>
			<RemoveDialog />
			<UpdateDialog />
			<LeaveDialog />
			<div className="h-full flex flex-col">
				<div className="flex justify-between items-center h-[49px] px-4 border-b">
					<p className="text-lg font-bold">Profile</p>
					<Button onClick={onClose} size="iconSm" variant="ghost">
						<XIcon className="size-5 stroke-[1.5]" />
					</Button>
				</div>
				<div className="flex flex-col items-center justify-center p-4">
					<Avatar className="max-w-[256px] max-h-[256px] size-full">
						<AvatarImage src={member.user.image} />
						<AvatarFallback className="aspect-square text-6xl">
							{avatarFallback}
						</AvatarFallback>
					</Avatar>
				</div>
				<div className="flex flex-col p-4">
					<p className="text-xl font-bold">{member.user.name}</p>
					{currentMember?.role === "admin" &&
					currentMember?._id !== memberId ? (
						<div className="flex items-center gap-2 mt-4">
							<Button
								variant="outline"
								className="w-full capitalize"
							>
								{member.role}{" "}
								<ChevronDownIcon className="size-4 ml-2" />
							</Button>
							<Button
								onClick={onRemove}
								variant="outline"
								className="w-full"
							>
								Remove
							</Button>
						</div>
					) : currentMember?._id === memberId &&
					  currentMember?.role !== "admin" ? (
						<div className="mt-4">
							<Button
								onClick={onLeave}
								variant="outline"
								className="w-full"
							>
								Leave
							</Button>
						</div>
					) : null}
				</div>
				<Separator />
				<div className="flex flex-col p-4">
					<p className="text-sm font-bold mb-4">
						Contact Information
					</p>
					<div className="flex items-center gap-2">
						<div className="size-9 rounded-md bg-muted flex items-center justify-center">
							<MailIcon className="size-4" />
						</div>
						<div className="flex flex-col">
							<p className="text-[13px] font-semibold text-muted-foreground ">
								Email Address
							</p>
							<Link
								href={`mailto:${member.user.email}`}
								className="text-sm hover:underline text-[#1264a3]"
							>
								{member.user.email}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
