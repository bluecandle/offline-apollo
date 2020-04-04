import React from "react";
import {Mutation} from "react-apollo";
import gql from "graphql-tag";
import Editor from "../../Components/Editor";

const ADD_NOTE = gql `
  mutation createNote($title: String!, $content: String!) @client { # ! 는 non-nullable 이라는 뜻임을 다시 기억합시다!
    createNote(title: $title, content: $content) {
      id
    }
  }
`;

export default class Add extends React.Component {
    render() {
        return (
          // Mutation query 를 생성하고, _onSave 함수(this.createNote 사용중)를 Editor 에 넘겨줘서, Editor component 가 작동하도록.
            <Mutation mutation={ADD_NOTE}>
                {createNote => {
                    this.createNote = createNote;
                    return <Editor onSave={this._onSave}/>;
                }}
            </Mutation>
        );
    }
    _onSave = (title, content) => {
        const {history: {
                push
            }} = this.props; // redirect 를 위해 가져오는 것. (history 안에서 push 라는 함수를 가져오는거지)
        if (title !== "" && content !== "") {
            this.createNote({
                variables: {
                    title,
                    content
                }
            });
            push("/");
        }
    };
}