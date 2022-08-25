import { useState } from "react";
import styled from "styled-components";
import Comment from "./comment";
import NewComment from "./newcomment";
import { useQuery } from "graphql-hooks";
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
  height: 90px;
  width: 90%;
  padding: 5px;
`;

const CoomentOuterBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const getSubComments = `query getSubComments($id: ID!)  {
	subcomments(id: $id) {
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
`;
export default function CommentList({
  id,
  comments,
  sub,
  noReply,
  setShowReply,
  writeReply,
  setWriteReply,
}) {
  let [tdata, setData] = useState([]);
  const { loading, error, data } = useQuery(getSubComments, {
    variables: {
      id: id,
    },
  });
  if (!noReply) {
    if (!tdata && !loading) {
    }
  } else {
    setData([]);
  }

  return (
    <Frame>
      {comments.map(([x, y, cmt], i) => (
        <CoomentOuterBox key={i}>
          <CommentInnerBox sub={sub}>
            <Comment
              data={cmt || {}}
              noReply={noReply}
              showReply={x}
              setShowReply={(x) => {
                let z = y;
                if (!x) {
                  z = false;
                }
                setShowReply([
                  ...comments.slice(0, i),
                  [x, z, cmt],
                  ...comments.slice(i + 1),
                ]);
              }}
              writeReply={y}
              setWriteReply={(y) => {
                if (x) {
                  setShowReply([
                    ...comments.slice(0, i),
                    [x, y, cmt],
                    ...comments.slice(i + 1),
                  ]);
                }
              }}
            ></Comment>
          </CommentInnerBox>
          {x && y ? (
            <NewSubCommentBox>
              <NewComment usb></NewComment>
            </NewSubCommentBox>
          ) : null}
          {!sub && data.length > 0 && x ? (
            <CommentList id={cmt._id} comments={data} sub noReply></CommentList>
          ) : null}
        </CoomentOuterBox>
      ))}
    </Frame>
  );
}
