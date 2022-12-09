import jwt from 'jsonwebtoken'
import HttpStatus from 'http-status-codes'

export const userAuth = async (event, context, callback) => {
    try
     {
      
      var bearer = event.authorizationToken
      console.log("bearer------>", bearer)

      if (!bearer){
      console.log("Inside Error part------->");
        throw {
          code: HttpStatus.BAD_REQUEST,
          message: 'Authorization token is required'
        }
      }
      // var bearerToken = bearer.split(' ')[1];
    // console.log("breaertoken--------------->",bearerToken);
      const user = await jwt.verify(bearer, process.env.SECRET_KEY);
      console.log("After -------------->", user );
      event.body = user.Email.trim()    
      console.log("UserId----------->", event.body);
       if(user || user.Email){
        return callback(null,generatePolicy(user.Email ,'Allow', '*'))
        

       }
      //  return callback(null, 'unauthorized')
    }catch (error) {
      throw new Error(error)
    }
  }
  
//   // Help function to generate an IAM policy
var generatePolicy = function(principalId, effect, resource) {
  var authResponse = {};
  console.log("Inside generate policy---------->");
  authResponse.principalId = principalId;
  console.log("Inside generate policy---------->",authResponse.principalId);
  if (effect && resource) {
      var policyDocument = {};
      policyDocument.Version = '2012-10-17'; 
      policyDocument.Statement = [];
      var statementOne = {};
      statementOne.Action = 'execute-api:Invoke'; 
      statementOne.Effect = effect;
      statementOne.Resource = resource;
  }
  console.log("Inside generate policy---------->",authResponse);
  return authResponse
}


