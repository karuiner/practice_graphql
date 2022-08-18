import styled, { css, keyframes } from "styled-components";
import { useQuery } from "graphql-hooks";
import Article from "./components/article";
import NewComment from "./components/newcomment";
import { useState } from "react";
import CommentList from "./components/commentList";

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

const QUERY = `query {
  hello
}
`;

function App() {
  // const { loading, error, data } = useQuery(QUERY);
  // console.log(loading, error, data);
  let [data, setData] = useState(Array(10).fill([false, false]));
  let [isLogin, setIsLogin] = useState(false);
  let [doLogout, setDoLogout] = useState(false);
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
          <Article />
        </ArticleArea>
        <ContentArea>
          <NewCommentBox>
            <NewComment></NewComment>
          </NewCommentBox>
          <CommentList comments={data} setShowReply={setData}></CommentList>
        </ContentArea>
      </InnerFrame>
    </Frame>
  );
}

export default App;
