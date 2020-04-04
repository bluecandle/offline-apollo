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
    note(id: $id) @client { # offline 작업 중이고, client 에서 형성된 데이터local state)이기 때문에, @client 를 넣어줘야 한다.
      ...NoteParts
    }
  }
  ${NOTE_FRAGMENT}
`;