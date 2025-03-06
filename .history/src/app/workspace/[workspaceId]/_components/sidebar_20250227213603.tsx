import { UserButton } from "@/features/auth/components/user-button";

export const Sidebar = () => {
	return (
		<aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-[4px]">
			<div>A</div>
			<div>
				<UserButton />
			</div>
		</aside>
	);
};
