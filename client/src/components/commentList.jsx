import { useState } from "react";
import styled from "styled-components";
import Comment from "./comment";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CommentInnerBox = styled.div`
  height: ${({ sub }) => (sub ? "90px" : "100px")};
  width: ${({ sub }) => (sub ? "90%" : "100%")};

  padding: 5px;
`;
const NewSubCommentBox = styled.div`
  height: "90px";
  width: "90%";

  padding: 5px;
`;

const CoomentOuterBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export default function CommentList({
  comments,
  sub,
  noReply,
  setShowReply,
  writeReply,
  setWriteReply,
}) {
  let [data, setData] = useState(Array(10).fill(false));
  return (
    <Frame>
      {comments.map((x, i) => (
        <CoomentOuterBox key={i}>
          <CommentInnerBox sub={sub}>
            <Comment
              noReply={noReply}
              showReply={x}
              setShowReply={(x) => {
                setShowReply([
                  ...comments.slice(0, i),
                  x,
                  ...comments.slice(i + 1),
                ]);
              }}
              writeReply={writeReply}
              setWriteReply={setWriteReply}
            ></Comment>
          </CommentInnerBox>
          {!sub && data.length && x > 0 ? (
            <CommentList
              comments={data}
              sub
              noReply
              writeReply={false}
              setWriteReply={() => {}}
            ></CommentList>
          ) : null}
        </CoomentOuterBox>
      ))}
    </Frame>
  );
}
