import styled from "styled-components";
import { useQuery } from "graphql-hooks";
import Article from "./components/article";
import NewComment from "./components/newcomment";
import Comment from "./components/comment";
import { useState } from "react";
import CommentList from "./components/commentList";
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

const SubContentArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CommentBox = styled.div`
  height: ${({ sub }) => (sub ? "90px" : "100px")};
  width: ${({ sub }) => (sub ? "90%" : "100%")};

  padding: 5px;
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
  let [data, setData] = useState(Array(10).fill(false));

  return (
    <Frame>
      <InnerFrame>
        <Header></Header>
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
