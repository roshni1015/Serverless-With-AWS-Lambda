import Note from "../models/Note.js";


export const AddNote = async (body) => {
   //console.log(body);
   const data = await Note.create(body);
  // console.log(data)
   return data;
}


export const getAllNotes = async (body) => {
   const data = await Note.find(body);

   return data;

}
export const getNote = async (_id, body) => {
   const data = await Note.findById({_id,body});
   return data;
}

export const updateNotes = async (_id, body) => {
   const data = await Note.findByIdAndUpdate(
       {
           _id:_id ,body
         },
         body,
         {
           new: true
         }
   );
   return data;
 };

 export const archiveNotes = async(_id,body) =>{
   const data = await Note.findByIdAndUpdate(
     {
      _id:_id,body
     },
     {
       isArchived: true
     },
     {
       new: true
     }
   );

   return data;
 }
 
 export const TrashNote = async(_id,body) =>{
   const data = await Note.findByIdAndUpdate(
     {
       _id:_id,body
     },
     {
      isTrash: true
     },
     {
       new: true
     }
   );
   return data;
 }