# Offline-Apollo
Courses from nomad-coder

Last 화요일 

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/88513d87-6000-4c7f-b532-2ee8ea9db284/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/88513d87-6000-4c7f-b532-2ee8ea9db284/Untitled.png)

GraphQL 사용해서 API 핸들링만 할 수 있는게 아니라, local state 도 사용 가능함! (리덕스, context API 없이!)

# setup

apollo-boost 에서 얻어지는 client 는 http 쪽으로 손 봐야할 것이 많아서 ?? ( apollo-boost에 쓰이는 client는 HTTP 링크를 필요로 하는데, 이 프로젝트에서는 그게 없거든!)

이 프로젝트에서는 apollo-boost 사용하지 않고 다른 패키지들을 설치하여 사용한다. ( cahce 에서만 작동하고 offline 인 client 를 만들기 위해)

# #1.2 Offline Apollo Configuration

    import { ApolloClient } from "apollo-client";
    import { InMemoryCache } from "apollo-cache-inmemory";
    import { withClientState } from "apollo-link-state";
    import { ApolloLink } from "apollo-link";
    // 사실 이거 다 apollo-boost 쓰면 자동으로 다 되는 내용들임. 근데, 수동으로 해보는거.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d61282a1-be7a-4cef-82df-76c86dcbc108/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d61282a1-be7a-4cef-82df-76c86dcbc108/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/914597f8-dd73-418c-9b57-1baf17a5df35/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/914597f8-dd73-418c-9b57-1baf17a5df35/Untitled.png)

# #1.3 Type Definitions for Offline Schema

#1.3.1 Intermission for Bug Fixing

App component 안에 아무 내용도 없으면 cache 관련 오류가 뜨는 버그가 존재했음 (지금도 존재하는지는 모르겠네).

혹시나 Apollo 를 custom 으로 setting 하고, 제대로 했는데 비슷한 현상을 겪는다면 이 부분을 확인해볼 필요가 있음!

# #1.4 Note Query part One, Two

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cbe0d34f-8d1b-4188-a540-bb47934fc470/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cbe0d34f-8d1b-4188-a540-bb47934fc470/Untitled.png)

GraphQL 구조를 다시 한 번 복습하자면, schema 에 A 라는 이름의 요청이 어떤 인자를 받으면서 진행될 것인지 정리해놓음. (schema 가 route의 index.js)

그리고 그 받은 인자를 통해 어떤 동작을 할 것인지 resolver 에 정의해놓는것.(query.ctrl.js)

    // 즉, shcema 에 보면, note query 는 id 라는 인자를 받는다고 되어있는데, 그 인자가 variables 라는 객체 안에 들어있다.
    export const resolvers = {
        Query: {
            note: (_, variables, { getCacheKey }) => {
                const id = getCacheKey({ __typename: "Note", id: variables.id }); // cache 에서 데이터를 가져오기 위한 과정.
                console.log(id);
                return null;
              }
        }
      };
    // 그럼 getCacheKey 는 어디서 온겨?
    // _ 는 Parent 이고, getCacheKey가 있는 세 번째 자리는 Context
    // 그리고 그 context 에서 제공하는 것 중 getCacheKey 는 key ID 를 cache 에서 탐색해주는 기능임.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7427f158-9b7a-4663-8781-6fad87c96d29/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7427f158-9b7a-4663-8781-6fad87c96d29/Untitled.png)

react-apollo 내장 기능!

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ca6d5466-0094-4e59-b8ba-f585aaf224ff/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ca6d5466-0094-4e59-b8ba-f585aaf224ff/Untitled.png)

react-apollo 를 통해 local state 를 사용하여 작업할 때는

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c7cb7be2-12da-4e9d-a5ec-02b0f2b4bc99/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c7cb7be2-12da-4e9d-a5ec-02b0f2b4bc99/Untitled.png)

    export const defaults = {
        notes: [
            {
              __typename: "Note",
              id: 1,
              title: "First",
              content: "Second"
            }
          ]
      };

GraphQL 에서 말하는 fragment란???

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c154580c-63cf-46a5-96e8-d7f7631d4780/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c154580c-63cf-46a5-96e8-d7f7631d4780/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0dc9261c-38d4-40b5-8fa5-540cc718354e/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/0dc9261c-38d4-40b5-8fa5-540cc718354e/Untitled.png)

id 를 가지고 있다면, id 가 array 안에 꼭꼭 숨어있고 뭐 그러더라도! 찾아낼 수 있다는 이야기.

    export const NOTE_FRAGMENT = gql`
      fragment NotePars on Note {
        id
        title
        content
      }
    `
    // 기본적으로, fragment 라는건, 지속적으로 사용하고 싶은걸 말함.(계속 같은 내용을 입력하기 싫다 이거지.)
    
    export const resolvers = {
        Query: {
            note: (_, variables, {cache}) => {
                const id = cache
                    .config
                    .dataIdFromObject({__typename: "Note", id: variables.id});
                const note = cache.readFragment({fragment: NOTE_FRAGMENT, id}); // 이런식으로 사용되는거!
                return note;
            }
    
        }
    };

Last 금요일 

# #1.6 Add Note Mutation

    const newNote = {
              __typename: "Note",
              title,
              content,
              id: notes.length + 1
            };
    //Apollo 에서 구성에 아무 문제가 없는지 확인을 해준다! redux 를 사용하면 state 형태를 임의로 변경시킬 위험(실수가능성)이 있는데, 그걸 방지해 주는거지!
    //schema 에 이미 등록된 Note type 의 형태, structure 대로 추가를 해야만 정상적으로 진행된다는 의미!
    
    cache.writeData({
              data: {
                notes: [newNote, ...notes] // 전에 있던 note 들을 ...notes 이렇게 해서 넣는거 잊지말고
              }
            });
    //그리고 이런 식으로 cache 에 데이터 주기.

# #1.7 Edit Note Mutation

# #1.8 Router and Routes

# #1.9 Notes Route

Yesterday 

# #1.10 Note Route

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e11948eb-b997-4e96-990b-cf2a685209a5/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e11948eb-b997-4e96-990b-cf2a685209a5/Untitled.png)

# #1.11 Add Note Route

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cf7e377f-1848-4bce-9155-6763532ab6c9/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/cf7e377f-1848-4bce-9155-6763532ab6c9/Untitled.png)

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
    // mutation 을 바로 쏘지 않고, title 이랑 content 가 어떤 내용인지 확인하고 싶기 때문에 _onSave 라는 중간 단계를 놓는 것.

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/79c6e9c5-5a86-4ef3-ac5f-06531d835013/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/79c6e9c5-5a86-4ef3-ac5f-06531d835013/Untitled.png)

# #1.12 Edit Note Route

# #1.13 Saving the Notes Offline

Note 를 만들거나 수정할 때, localStorage 에 저장이 되도록 만드는 함수가 작동하도록 만든다.

그리고 개발자 도구에서 Application tab 에 들어가면 localStorage 를 볼 수 있다! (Cookie 도 볼 수 있다.)

    import TextareaAutosize from "react-textarea-autosize";
    
    const TitleInput = styled(TextareaAutosize)`
      font-size: 50px;
      font-weight: 600;
      width: 100%;
      &::placeholder {
        font-weight: 600;
      }
    `;
    // 사용자가 입력을 계속 이어나갈때 스크롤링을 하지 않고 입력창 자체가 넓어지도록 해준다!

# #1.14 Restoring Offline Notes

그냥 기본적인 localStorage 기능을 사용하여 setItem 해서 저장했던 것을 getItem 을 통해 불러오는 작업.

    export const restoreNotes = () => {
        const notes = localStorage.getItem("notes");
        if (notes) {
          try {
            const parsedNotes = JSON.parse(notes);
            return parsedNotes;
          } catch (error) {
            console.log(error);
            return [];
          }
        }
        return [];
      };
    
    // localStorage 에서 getItem 할 때 좋은 practice 라고 생각함! 

# #1.15 Conclusions

    // clientState, apollo, index, App, Router 의 관계
    // 그리고 apollo 와 graphql 의 관계 \ RESTful 과 redux 와의 비교
    apollo.js 는 apollo client 를 생성하기 위한 파일이고, 이를 통해 생성된 client 는 index.js 에 App component 상위에 들어가게된다 (provider)
    clientState는 그 apollo.js 에서 쓰이는 내용들을 정리한 파일이다.
    App 컴포넌트에서는 provider 를 받은 이후 Router 를 상위에 놓고 각 Route 마다 component 를 설정해준다.
    
    그리고 각 component 에서 다른 component 로 이동이 필요할 때는 react-router-dom 의 Link 컴포넌트를 이용한다.
    
    그리고 application 에서 발생하는 데이터 (local state) 는 apollo 의 cache 에 저장된다.
    서버에서 받아와서 변환되는 데이터가 아닌, 애초에 client 쪽에서 cache 에 추가시킨 데이터는 @client 라는 표식을 통해 apollo 안에서 핸들링이 가능하다.
    즉, graphql 이 RESTful 을 대체하고, 이 graphql 방식을 사용하는 apollo 모듈은 redux를 대체하는 용도를 제공한다.
