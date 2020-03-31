import gql from "graphql-tag";

export const GET_NOTES = gql`
  {
    notes @client { # client 내에서만 사용하는 쿼리임을 표시!
      id
      title
      content
    }
  }
`;