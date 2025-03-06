"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { UserButton } from "@/features/auth/components/user-button";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";

const HomePage = () => {
	const router = useRouter();

	const [open, setOpen] = useCreateWorkspaceModal();

	const { data, isLoading } = useGetWorkspaces();

	const workspaceId = useMemo(() => data?.[0]?._id, [data]);

	useEffect(() => {
		if (isLoading) return;

		if (workspaceId) {
			router.replace(`/workspace/${workspaceId}`);
		} else if (!open) {
			setOpen(true);
		}
	}, [isLoading, open, router, setOpen, workspaceId]);

	return (
		<div className="items-center justify-center space-y-2.5 p-10">
			<UserButton />
		</div>
	);
};

export default HomePage;
