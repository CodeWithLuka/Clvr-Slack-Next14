import { UserButton } from "@/features/auth/components/user-button";

import { WorkspaceSwitcher } from "./workspace-switcher";
import { SidebarButton } from "./sidebar-button";

export const Sidebar = () => {
	return (
		<aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-[6px]">
			<WorkspaceSwitcher />
			<SidebarButton />
			<div className="flex fle-xol items-center justify-center gap-y-1 mt-auto">
				<UserButton />
			</div>
		</aside>
	);
};
