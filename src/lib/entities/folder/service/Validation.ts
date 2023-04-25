import { NOTE_NAME_MAX_LENGTH } from "$lib/shared/constants/model/Constants";

export function validateFolderName(folderName: string | null): string {
	let validationErrorText = "";
	if (!folderName) {
		validationErrorText = "Folder name is required!";
	} else if (folderName.length > NOTE_NAME_MAX_LENGTH) {
		validationErrorText = `Folder name must no more than ${NOTE_NAME_MAX_LENGTH} characters long!`;
	}
	return validationErrorText;
}
