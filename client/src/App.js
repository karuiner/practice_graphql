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
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const getLogin = `
{
  login {
    _id
    userName
    createdAt
    updatedAt
  }
}
`;
const createArticleComment = `
mutation($input:CommentInput!){
  createComment(input:$input) {
    _id
    comment
    writerId {
      _id
      userName
    }
    articleId
    commentId
    createdAt
    updatedAt
  } 
}
`;

const serverURI = "http://localhost:4000/graphql";

function App() {
  let [comments, setCommnets] = useState();
  let [article, setArticle] = useState();
  let [userInfo, setUserInfo] = useState({ status: false, userName: "" });
  let [doLogout, setDoLogout] = useState(false);
  if (!comments) {
    axios
      .post(serverURI, {
        query: getOneArticle,
        variables: {
          id: "6309fafc83c7a6c4d4cf133f",
        },
      })
      .then((x) => {
        let newdata = x.data.data.article;
        let newcomments = newdata.comments.map((x) => [false, false, x]);
        setArticle({ ...newdata });
        setCommnets([...newcomments]);
      });
  }
  return (
    <Frame>
      <InnerFrame>
        <Header>
          {userInfo.status ? (
            <UserIconBox
              isLogin={userInfo.status}
              doLogout={doLogout}
              onAnimationEnd={(e) => {
                if (userInfo.status && doLogout) {
                  setUserInfo({ status: false, userName: "" });
                  setDoLogout(false);
                }
              }}
            >
              {userInfo.userName}
            </UserIconBox>
          ) : null}
          <InOutButton
            onClick={() => {
              if (!userInfo.status) {
                axios.post(serverURI, { query: getLogin }).then((x) => {
                  setUserInfo({ ...x.data.data.login, status: true });
                });
              } else {
                setDoLogout(true);
              }
            }}
          >
            {userInfo.status ? "로그아웃" : "로그인"}
          </InOutButton>
        </Header>
        <ArticleArea>
          <Article article={article} />
        </ArticleArea>
        <ContentArea>
          <NewCommentBox>
            <NewComment
              writeComment={(comment) => {
                if (userInfo.status) {
                  axios
                    .post(serverURI, {
                      query: createArticleComment,
                      variables: {
                        input: {
                          writerId: userInfo._id,
                          comment,
                          articleId: article._id,
                        },
                      },
                    })
                    .then((x) => {
                      console.log(x.data.data.createComment);
                      x.data.data.createComment.writerId.userName =
                        userInfo.userName;
                      setCommnets([
                        [false, false, { ...x.data.data.createComment }],
                        ...comments,
                      ]);
                    });
                }
              }}
            ></NewComment>
          </NewCommentBox>
          {comments ? (
            <CommentList
              userInfo={userInfo}
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
