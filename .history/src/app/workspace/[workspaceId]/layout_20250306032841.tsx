"use client";

import { LoaderIcon } from "lucide-react";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Thread } from "@/features/messages/components/thread";

import { usePanel } from "@/hooks/use-panel";

import { Id } from "../../../../convex/_generated/dataModel";

import { Sidebar } from "./_components/sidebar";
import { Toolbar } from "./_components/toolbar";
import { WorkspaceSidebar } from "./_components/workspace-sidebar";

interface WorkspaceIdLayoutProps {
	children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
	const { parentMessageId, profileMemberId, onClose } = usePanel();

	const showPanel = !!parentMessageId || !!profileMemberId;

	return (
		<div className="h-full">
			<Toolbar />
			<div className="flex h-[calc(100dvh-40px)]">
				<Sidebar />
				<ResizablePanelGroup
					direction="horizontal"
					autoSaveId="cwls-workspace-layout"
				>
					<ResizablePanel
						defaultSize={20}
						minSize={11}
						className="bg-[#5E2C5F]"
					>
						<WorkspaceSidebar />
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel minSize={20}>{children}</ResizablePanel>
					{showPanel && (
						<>
							<ResizableHandle withHandle />
							<ResizablePanel minSize={20} defaultSize={29}>
								{parentMessageId ? (
									<Thread
										messageId={
											parentMessageId as Id<"messages">
										}
										onClose={onClose}
									/>
								) : (
									<div className="flex h-full items-center justify-center">
										<LoaderIcon className="size-5 animate-spin text-muted-foreground" />
									</div>
								)}
							</ResizablePanel>
						</>
					)}
				</ResizablePanelGroup>
			</div>
		</div>
	);
};

export default WorkspaceIdLayout;
