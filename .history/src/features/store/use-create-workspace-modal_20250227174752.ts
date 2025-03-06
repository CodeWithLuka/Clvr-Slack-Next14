import { atom, useAtom } from "jotai";

const createWorkspaceModalAtomState = atom(false);

export const useCreateWorkspaceModal = () => {
	return useAtom(createWorkspaceModalAtomState);
};
