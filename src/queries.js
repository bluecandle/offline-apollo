import gql from "graphql-tag";
import { NOTE_FRAGMENT } from "./fragments";

export const GET_NOTES = gql`
  {
    notes @client { # client 내에서만 사용하는 쿼리임을 표시!
      id
      title
      content
      ...NoteParts
    }
  }
  ${NOTE_FRAGMENT}  
`;

export const GET_NOTE = gql`
  query getNote($id: Int!) {
    note(id: $id) @client {
      ...NoteParts
    }
  }
  ${NOTE_FRAGMENT}
`;