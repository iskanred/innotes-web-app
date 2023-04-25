import { FOLDER_NAME_MAX_LENGTH } from "$lib/shared/constants/model/Constants";

export function validateNoteName(noteName: string | null): string {
	let validationErrorText = "";
	if (!noteName) {
		validationErrorText = "Note name is required!";
	} else if (noteName.length > FOLDER_NAME_MAX_LENGTH) {
		validationErrorText = `Note name must no more than ${FOLDER_NAME_MAX_LENGTH} characters long!`;
	}
	return validationErrorText;
}
