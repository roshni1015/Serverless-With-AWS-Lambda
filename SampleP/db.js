import mongoose from 'mongoose'
mongoose.Promise = global.Promise;
let isConnected;


export const connectToDatabase = async() => {
  try{
    if (isConnected) {
      console.log('=> using existing database connection');
      return Promise.resolve();
    }
  
    console.log('=> using new database connection');
    console.log("Database connect----------",process.env.DATA_BASE);
    return mongoose.connect(process.env.DATA_BASE)
      .then(db => { 
        isConnected = db.connections[0].readyState;
      });

  }catch(error){
    return Promise.reject(error);
  }
 
};