// * THIS FUNCTION COMBINE TWO OBJECT ARRAY
export function combineValues(array1, array2) {
	// Create a new array by iterating over each object in array1
	const combinedArray = array1.map((obj) => ({
		...obj,
	}));

	// Iterate over each object in array2
	array2.forEach((obj) => {
		// Find the corresponding object in combinedArray
		const matchingObj = combinedArray.find(
			(combinedObj) => combinedObj._id === obj._id
		);

		// If a matching object is found, merge the properties and values of obj into matchingObj
		if (matchingObj) {
			Object.assign(matchingObj, obj);
		}
	});

	return combinedArray;
}
