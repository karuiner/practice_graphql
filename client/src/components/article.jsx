import styled from "styled-components";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ArticleInfoBox = styled.div`
  height: 100px;
  width: 100%;
  border: solid 1px red;
  display: flex;
  flex-direction: column;
`;
const ArticleSubject = styled.div`
  height: 100px;
  width: 100%;
  border: solid 1px red;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ArticleInfoLowerBox = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  border: solid 1px red;
`;

const Content = styled.div`
  height: calc(100% - 100px);
  width: 100%;
  padding: 10px;
`;

const ArticleInfoSubBox = styled.div`
  flex: 1 0 0;
  height: 100%;
  display: flex;
  ${({ left }) =>
    left ? "justify-content: flex-end;" : "justify-content: flex-start;"}
  align-items: center;
  ${({ left }) => (!left ? "padding-left: 10px;" : "padding-right: 10px;")}
`;

export default function Article() {
  return (
    <Frame>
      <ArticleInfoBox>
        <ArticleSubject>Title</ArticleSubject>
        <ArticleInfoLowerBox>
          <ArticleInfoSubBox left>글쓴이</ArticleInfoSubBox>
          <ArticleInfoSubBox>alsjfuensl</ArticleInfoSubBox>
          <ArticleInfoSubBox left>작성 일자</ArticleInfoSubBox>
          <ArticleInfoSubBox>1992.06.10</ArticleInfoSubBox>
          <ArticleInfoSubBox left>조회수</ArticleInfoSubBox>
          <ArticleInfoSubBox>100</ArticleInfoSubBox>
          <ArticleInfoSubBox left>댓글수</ArticleInfoSubBox>
          <ArticleInfoSubBox>10</ArticleInfoSubBox>
        </ArticleInfoLowerBox>
      </ArticleInfoBox>
      <Content>{"test"}</Content>
    </Frame>
  );
}
