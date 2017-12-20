
var responseHandler =
function(req,res,data,err){
	var result ={
		Status:"",
		data:""
		
	}
	if(err){
		console.log(err);
		//do something
		result.Status="400";
		result.message="Error";
		result.data="Error occured. Please try again later."

		
	}
	else{
        console.log(data);
		result.Status="200";
		result.data=data;
		result.successMessages="SUCCESS";
		//do something
		 
	}
	res.json(result);
}
module.exports= responseHandler;