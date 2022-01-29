export const areEqual = (a: any, b: any, c: any) => {
	if (a === b && b === c && a !== "") return true;
	return false;
};
