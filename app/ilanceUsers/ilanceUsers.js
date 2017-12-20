var ilanceUsers={}
var mySql=require("../../config/mysqlConnection")
var responseHandler = require("../../utils/responseHandler");
var jwt = require("jwt-simple");
var bcrypt = require('bcrypt');

ilanceUsers.doLogin = (req,res)=>
{

    var LoginData = req.body;
     sql.connect(config.db).then(() => {
        var sqlRequest = new sql.Request();
        sqlRequest.multiple=true;
        sqlRequest.query(doLoginData(LoginData)).then(function (recordSet) {
            sql.close();
            // console.log(recordSet);
            if (recordSet.length == 0) {
                responseHandler(req, res, null, "User doesnot exist ");
            }
            else {

                bcrypt.hash(recordSet.password, 10, function(err, hash) {
                    
                    if(!err){
                    if (hash ) {
                        var token = generateToken(recordSet);
                        let UserData = {
                            "USERID": recordSet.user_id,
                            "USERNAME": recordSet.username,
                            "FIRSTNAME": recordSet.first_name,
                            "LASTNAME": recordSet.last_name,
                            "EMAIL": recordSet.email,
                            token: token,
                            
                        }
                        responseHandler(req, res, UserData, null);
                    }
                    else {
                        responseHandler(req, res, null, "Password Don't Matched ");
                    }

                }
                else{
                    responseHandler(req, res, null, "bcrypt Error ");

                }

                  });

              
            }
        }).catch(function (err) {
            // console.log(err);
            sql.close();
            responseHandler(req, res, null, "User doesnot exist");

        });

    }).catch(function (err) {
         console.log(err);
        responseHandler(req, res, null, "Error Connecting to Database.");
    });



}

function doLoginData(LoginData) {
    return `SELECT *  from  ilance_users where USERNAME=`+LoginData.userName;
  
   
}



ilanceUsers.getDataFromUserAndProjects = (req,res)=>
{

    var sqlQuery=`SELECT U.USERNAME,U.EMAIL,U.PHONE,P.project_title,P.project_details,P.project_type,P.tags,P.genre FROM ilance_users U
    INNER JOIN ilance_projects P  ON P.USER_ID = U.USER_ID`
    mySql.query(sqlQuery, function(err, result) {
        if (!err)
        {
            //res.json(result)
            responseHandler(req,res,result,null)
        }
        else
        {
            //console.log(err)  
            responseHandler(req,res,null,"ERROR")
        }
      });

}

//   Token Generator 
function generateToken(data) {
    var token = "JWT " + jwt.encode(data, config.secret);
    return token;
}


module.exports=ilanceUsers;

