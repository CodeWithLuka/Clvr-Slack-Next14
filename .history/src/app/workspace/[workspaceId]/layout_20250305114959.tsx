"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

import { usePanel } from "@/hooks/use-panel";

import { Sidebar } from "./_components/sidebar";
import { Toolbar } from "./_components/toolbar";
import { WorkspaceSidebar } from "./_components/workspace-sidebar";

interface WorkspaceIdLayoutProps {
	children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
	const { parentMessageId, onClose } = usePanel();

	const showPanel = !!parentMessageId;

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
								Load Thread
							</ResizablePanel>
						</>
					)}
				</ResizablePanelGroup>
			</div>
		</div>
	);
};

export default WorkspaceIdLayout;
