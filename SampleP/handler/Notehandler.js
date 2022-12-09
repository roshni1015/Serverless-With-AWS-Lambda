'use strict';
import dotenv from 'dotenv'
dotenv.config()
import * as UserService from '../Service/Note.Service.js'
import { connectToDatabase } from '../db.js';


export const createNote = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async() => {
      const details = JSON.parse(event.body)
      details.UserID = event.requestContext.authorizer.claims.Email;
      console.log("UserId in Create Note-------------->", details.UserID);
      console.log("details----------", details);
      await UserService.AddNote(details)
        .then(note => callback(null, {
          statusCode: 200,
          body: JSON.stringify({message:"Note created Successfully", data:note})
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the note.'
        }));
    });
};

export const getOneNote = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async() => {
      const details = JSON.parse(event.body)
      await UserService.getNote(event.pathParameters.id)
        .then(note => callback(null, {
          statusCode: 200,
          body: JSON.stringify({message:"Note Fetched Successfully" , data:note})
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the note.'
        }));
    });
};

export const getAllNote = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async() => {
      const details = JSON.parse(event.body)
      await UserService.getAllNotes(details)
        .then(notes => callback(null, {
          statusCode: 200,
          body: JSON.stringify({message:"All Notes Fetched", data:notes})
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }))
    });
};

export const updateNote = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async() => {
      const details = JSON.parse(event.body)
      await UserService.updateNotes(event.pathParameters.id, details)
        .then(notes => callback(null, {
          statusCode: 200,
          body: JSON.stringify({message:"Note Updated Successfully", data:notes})
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }));
    });
};

export const isArchive = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async() => {
      const details = JSON.parse(event.body)
      await UserService.archiveNotes(event.pathParameters.id, details)
        .then(notes => callback(null, {
          statusCode: 200,
          body: JSON.stringify({message:"Note Archived Successfully", data:notes})
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }));
    });
};
export const isTrash = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(async() => {
      const details = JSON.parse(event.body)
      await UserService.TrashNote(event.pathParameters.id)
        .then(notes => callback(null, {
          statusCode: 200,
          body: JSON.stringify({message:"Note trashed Successfully", data:notes})
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the notes.'
        }));
    });
};
