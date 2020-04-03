import gql from "graphql-tag";

// fragment 라는 말 뜻대로, note type 의 일부분을 정형화해놓은것.
export const NOTE_FRAGMENT = gql`
  fragment NoteParts on Note {
    id
    title
    content
  }
`;