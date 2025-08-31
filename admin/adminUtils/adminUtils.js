export const buildOject = (flattenObject , property)=>{
	const obj = {}

	// console.log("property path is : " , property.path)

	Object.entries(flattenObject).map(( [key , value] )=>{

		if(key.startsWith(`${property.path}`)) obj[key.split(".")[1]] = value

	})

	// console.log("object is : " , obj)

	return obj
}