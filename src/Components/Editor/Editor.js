import React from "react";
import styled from "styled-components";
import MarkdownRenderer from "react-markdown-renderer";
import TextareaAutosize from "react-textarea-autosize";

const TitleInput = styled(TextareaAutosize)`
  font-size: 50px;
  font-weight: 600;
  width: 100%;
  &::placeholder {
    font-weight: 600;
  }
`;

const ContentPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
`;

const ContentInput = styled(TextareaAutosize)`
  font-size: 18px;
  margin-top: 15px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Button = styled.button``;

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || "", // title 이 주어진 경우 state 에 저장하고 아니면 비워놓는다는 내용을 이런식으로 간결하게 표현 가능!
      content: props.content || "",
      id: props.id || null
    };
  }
  render() {
    const { title, content } = this.state; // 왜 여기서는 hook 안쓰고 그냥 일반 방식으로 했지??
    return (
      <>
        <TitleContainer>
          <TitleInput
            value={title}
            onChange={this._onInputChange}
            placeholder={"Untitled..."}
            name={"title"}
          />
          <Button onClick={this._onSave}>Save</Button>
        </TitleContainer>
        <ContentPreview>
          <ContentInput
            value={content}
            onChange={this._onInputChange}
            placeholder={"# This supports markdown!"}
            name={"content"}
          />
          <MarkdownRenderer markdown={content} className={"markdown"} />
        </ContentPreview>
      </>
    );
  }
  _onInputChange = event => {
    const {
      target: { value, name }
    } = event;
    this.setState({
      [name]: value
    });
  };
  _onSave = () => {
    const { onSave } = this.props;
    const { title, content, id } = this.state;
    onSave(title, content, id);
  };
}