"use client";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Sidebar } from "./_components/sidebar";
import { Toolbar } from "./_components/toolbar";

interface WorkspaceIdLayoutProps {
	children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
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
						<div>Channels Sidebar</div>
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel minSize={20}>{children}</ResizablePanel>
				</ResizablePanelGroup>
			</div>
		</div>
	);
};

export default WorkspaceIdLayout;
