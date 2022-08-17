import styled from "styled-components";
import { useQuery } from "graphql-hooks";
import Article from "./components/article";
import NewComment from "./components/newcomment";
import Comment from "./components/comment";
import { useState } from "react";
const Frame = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  align-items: center;
`;

const CommentBox = styled.div`
  height: ${({ sub }) => (sub ? "80px" : "100px")};
  width: ${({ sub }) => (sub ? "80%" : "100%")};

  padding: 5px;
`;
const NewCommentBox = styled.div`
  height: ${({ sub }) => (sub ? "80px" : "100px")};
  width: ${({ sub }) => (sub ? "80%" : "100%")};

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
          {data.map((x, i) => {
            return (
              <SubContentArea key={i}>
                <CommentBox
                  onClick={() => {
                    setData([
                      ...data.slice(0, i),
                      !data[i],
                      ...data.slice(i + 1),
                    ]);
                  }}
                >
                  <Comment></Comment>
                </CommentBox>
                {data[i] ? (
                  <SubContentArea>
                    {
                      <NewCommentBox sub>
                        <NewComment></NewComment>
                      </NewCommentBox>
                    }
                    {Array(10)
                      .fill(1)
                      .map((x, i) => {
                        return (
                          <CommentBox key={i + "1"} sub>
                            <Comment></Comment>
                          </CommentBox>
                        );
                      })}
                  </SubContentArea>
                ) : null}
              </SubContentArea>
            );
          })}
        </ContentArea>
      </InnerFrame>
    </Frame>
  );
}

export default App;
