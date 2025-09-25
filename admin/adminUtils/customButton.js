export const customButton = async(request , response , context)=>{
	try{
		console.log("custom button clicked");
		alert("custom button clicked");

		console.log("request is : " , request)
		console.log("response is : " , response)
		console.log("context is : " , context)

		return {
          notice: {
            message: 'Function executed successfully!',
            type: 'success'
          }
        }

	}catch(err){
		console.log("[ERROR] while executing the custom component")
	}
}