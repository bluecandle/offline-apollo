// export const defaults = {}; export const resolvers = {}; export const
// typeDefs = {}; #1.3 Type Definitions for Offline Schema

import {NOTE_FRAGMENT} from "./fragments";
import { GET_NOTES } from "./queries";
import { saveNotes, restoreNotes } from "./offline";

export const defaults = {
    // notes: [
    //     {
    //         __typename: "Note",
    //         id: 1,
    //         title: "First",
    //         content: "- Second"
    //     }
    // ]
    // notes: []
    notes: restoreNotes()
};
// editNote(id: String!, title: String!, content:String!): Note
export const typeDefs = [`
      schema {
          query: Query
          mutation: Mutation
      }
      type Query {
          notes: [Note]!
          note(id: Int!): Note
      }
      type Mutation{
        createNote(title: String!, content: String!): Note
        editNote(id: Int!, title: String, content:String): Note
      }
      type Note{
          id: Int!
          title: String!
          content: String!
      }
      `];
export const resolvers = {
    Query: {
        // note: (_, variables, { getCacheKey }) => {     const id = getCacheKey({
        // __typename: "Note", id: variables.id });     console.log(id);     return
        // null;   }
        
        note: (_, variables, {cache}) => {
            const id = cache
                .config
                .dataIdFromObject({__typename: "Note", id: variables.id});
            const note = cache.readFragment({fragment: NOTE_FRAGMENT, id});
            return note;
        }

    },
    Mutation: {
      createNote: (_, variables, { cache }) => {
        const { notes } = cache.readQuery({ query: GET_NOTES });
        const { title, content } = variables;
        const newNote = {
          __typename: "Note",
          title,
          content,
          id: notes.length + 1
        };
        cache.writeData({
          data: {
            notes: [newNote, ...notes]
          }
        });
        saveNotes(cache); // offline localStorage 에 저장.
        return newNote;
      },

      editNote: (_, { id, title, content }, { cache }) => { // cache from the context
        // 1. id 를 받아서
        const noteId = cache.config.dataIdFromObject({
          __typename: "Note",
          id
        });
        // 2. Id 를 통해 fragment 를 받는다.
        const note = cache.readFragment({ fragment: NOTE_FRAGMENT, id: noteId }); // mutation 안에서는 id만 사용할 수는 없음. (위에 query 에서는 됐는데...?)
        // console.log(note)  
        const updatedNote = {
          ...note,
          title,
          content
        };
        cache.writeFragment({
          id: noteId,
          fragment: NOTE_FRAGMENT,
          data: updatedNote
        });
        saveNotes(cache); // offline localStorage 에 저장.
        return updatedNote;
      }
    }  
};