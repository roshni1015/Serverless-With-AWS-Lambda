import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/User.js';


export const UserRegister = async  (body) =>{
    const details = JSON.parse(body)
    const email = await User.findOne({ EmailID: details.EmailID })
    //console.log("email==================>", email.length);
    if (email) {
      console.log("Email Id already exits");
    } else {
      const saltRounds = 10;
      let hashPassword = await bcryptjs.hash(details.Password, saltRounds)
      console.log("Hash Password", hashPassword);
      details.Password = hashPassword;
      console.log("After Hashing req body", details);
      const data = await User.create(details);
      console.log("data==================>", data);
      return data;

    }
  }

  export const LoginUser = async (body) => {
    const userdata = JSON.parse(body)
    //console.log("Userdata inside Service ------>", userdata);
    const data = await User.findOne({EmailID: userdata.EmailID});
    console.log("Data After Search", data);
   
    //var token_header = new Headers();
    if(data != null){
      const match = await bcryptjs.compare(userdata.Password, data.Password);
      if(match){
        const token = jwt.sign({ "Id": data._id, "FirstName": data.FirstName, "Email": data.EmailID }, process.env.SECRET_KEY);  
        return token;
       
      }else{
        throw new Error("Invalid Password");
      }
    }
    else{
      throw new Error("User Doesn't Exists")
    }
    
  
  
  };