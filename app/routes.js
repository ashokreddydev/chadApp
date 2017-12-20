
var  ilanceUsers=require("./ilanceUsers/ilanceUsers")
module.exports = function(app){

    // controllers
    app.post("/api/login",ilanceUsers.doLogin);
    app.post("/api/getdata",ilanceUsers.getDataFromUserAndProjects);

     // page redirect
     app.get("/home",(req,res)=>{

        res.render('home');

     });
    
  
  
}