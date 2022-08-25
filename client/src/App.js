import styled, { css, keyframes } from "styled-components";
import { useQuery } from "graphql-hooks";
import Article from "./components/article";
import NewComment from "./components/newcomment";
import { useEffect, useState } from "react";
import CommentList from "./components/commentList";
import axios from "axios";
const FadeIn = keyframes`
  from { 
    opacity: 0;
  }

  to { 
    opacity: 1;
  }

`;

const FadeOut = keyframes`
from { 
  opacity: 1;
}

to { 
  opacity: 0;
}
`;
const Frame = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const InnerFrame = styled.div`
  max-width: 800px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
    width: 0;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 80px;
  border: solid 1px black;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const ArticleArea = styled.div`
  width: 100%;
  height: calc(50%);
  border: solid 1px black;
  display: flex;
`;
const ContentArea = styled.div`
  width: 100%;
  min-height: calc(50% - 80px);
  display: flex;
  border: solid 1px black;
  flex-direction: column;
  align-items: center;
`;

const InOutButton = styled.div`
  height: 60px;
  width: 80px;
  display: flex;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
  justify-content: center;
`;

const UserIconBox = styled.div`
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px black;
  ${({ isLogin, doLogout }) => {
    if (isLogin && !doLogout) {
      return css`
        animation: ${FadeIn} 1s linear;
      `;
    } else if (isLogin && doLogout) {
      return css`
        animation: ${FadeOut} 0.5s linear forwards;
      `;
    } else {
      return "";
    }
  }}
`;

const NewCommentBox = styled.div`
  height: ${({ sub }) => (sub ? "90px" : "100px")};
  width: ${({ sub }) => (sub ? "90%" : "100%")};

  padding: 5px;
`;

const getOneArticle = `query Test($id: ID!)  {
  article(id: $id) {
    _id
    writerId {
      _id
      userName
    } 
    subject
    content
    createdAt
    updatedAt
    comments {
      _id
      writerId {
        _id
        userName
      }
      comment
      createdAt
      updatedAt
    }
  }
}`;
const serverURI = "http://localhost:4000/graphql";

function App() {
  let [comments, setCommnets] = useState();
  let [article, setArticle] = useState();
  let [isLogin, setIsLogin] = useState(false);
  let [doLogout, setDoLogout] = useState(false);
  const { loading, error, data } = useQuery(getOneArticle, {
    variables: {
      id: "630751585ef053ba8ca8fdb5",
    },
  });
  if (!comments && data) {
    let newdata = data.article;
    console.log(newdata);
    let newcomments = newdata.comments.map((x) => [false, false, x]);
    setArticle({ ...newdata });
    setCommnets([...newcomments]);
  }
  // axios
  //   .post(serverURI, {
  //     query: `
  //       {
  //         article(id: "6304a9c2a857e5069fa5c3a1") {
  //         _id
  //         writerId
  //         content
  //         createdAt
  //         updatedAt
  //         }
  //       }

  //      `,
  //   })
  //   .then((x) => {
  //     console.log(x);
  //   });

  return (
    <Frame>
      <InnerFrame>
        <Header>
          {isLogin ? (
            <UserIconBox
              isLogin={isLogin}
              doLogout={doLogout}
              onAnimationEnd={(e) => {
                if (isLogin && doLogout) {
                  setIsLogin(false);
                  setDoLogout(false);
                }
              }}
            ></UserIconBox>
          ) : null}
          <InOutButton
            onClick={() => {
              if (!isLogin) {
                setIsLogin(!isLogin);
              } else {
                setDoLogout(true);
              }
            }}
          >
            {isLogin ? "로그아웃" : "로그인"}
          </InOutButton>
        </Header>
        <ArticleArea>
          <Article article={article} />
        </ArticleArea>
        <ContentArea>
          <NewCommentBox>
            <NewComment></NewComment>
          </NewCommentBox>
          {comments ? (
            <CommentList
              comments={comments}
              setShowReply={setCommnets}
            ></CommentList>
          ) : null}
        </ContentArea>
      </InnerFrame>
    </Frame>
  );
}

export default App;
