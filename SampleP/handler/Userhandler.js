'use strict';
import { connectToDatabase } from '../db.js';
import * as UserService from '../Service/User.Service.js'

export const UserRegistration =  ((event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async() => {
      await UserService.UserRegister(event.body)
        .then(users => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: "User created successfully", users: users}),
         
        }))

        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'EmailID not found.'
        }));

  });
});


export const UserLogin =  ((event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
  .then(async() => {
  await UserService.LoginUser(event.body)

    .then(token => callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: "User login successfully", data: token}),
      message: "User login successfully"
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'User Doesnot Found.'
    }));
  });
});




// export const UserLogin = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false;

//   connectToDatabase()
//     .then(async () => {
//       const details = JSON.parse(event.body);
//       const data = await User.findOne({ EmailID: details.EmailID })
//       if (data) {
//         const match = await bcrypt.compare(details.Password, data.Password);
//         if (match) {
//           const token = jwt.sign({ "Id": data._id, "FirstName": data.FirstName, "Email": data.EmailID }, process.env.SECRET_KEY);
//           console.log("token-------------->", token)
//           return {
//             statusCode: 200,
//             body: token,
//             message: "User created successfully"
//           }



//         } else {

//           throw new Error("Invalid Password");

//         }

//       }
//       else {
//         console.log("Emaild doesn't  exists");
//       }
//     })
// };
// export const getAllUser = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false;

//   connectToDatabase()
//     .then(() => {
//       User.find()
//         .then(user => callback(null, {
//           statusCode: 200,
//           body: JSON.stringify(user)
//         }))
//         .catch(err => callback(null, {
//           statusCode: err.statusCode || 500,
//           headers: { 'Content-Type': 'text/plain' },
//           body: 'Could not fetch the notes.'
//         }))
//     });
// };
