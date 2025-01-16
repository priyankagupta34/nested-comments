import { useEffect, useState } from "react";
import CommentComponent from "./CommentComponent";

function ReplySectionComponent({ parentId, prevComments }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setComments(prevComments);
  }, [prevComments]);
  const [add, setAdd] = useState(false);
  const [addReply, setAddReply] = useState();
  const [showReply, setShowReply] = useState(true);

  const publishReply = (newComment) => {
    function findAndAddComment(commentList) {
      for (const comment of commentList) {
        if (comment.id === newComment.parentId) {
          comment.replies.push(newComment);
          return true;
        }
        const check = findAndAddComment(comment.replies);
        if (check) return true;
      }
    }
    const done = findAndAddComment(comments);
    if (!done) comments.push(newComment);
    setComments([...comments]);
    setAdd(false);
    setAddReply(false);
    setShowReply(true);
  };

  const addComment = () => {
    setAdd(true);
    setAddReply(false);
  };

  return (
    <div>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="oneComment">
            <div className="name">{comment.name}</div>
            <div className="comment">{comment.comment}</div>
            {comment.replies.length === 0 ? (
              <button type="button" onClick={() => setAddReply(comment.id)}>
                Reply
              </button>
            ) : (
              <>
                {showReply ? (
                  <>
                    <button
                      type="button"
                      className="red"
                      onClick={() => {
                        comment.replies = [];
                        setComments([...comments]);
                      }}
                    >
                      Delete replies
                    </button>
                    {comment.replies.map((reply) => (
                      <ReplySectionComponent
                        parentId={comment.id}
                        key={reply.id}
                        prevComments={[...comment.replies]}
                      />
                    ))}
                  </>
                ) : null}
              </>
            )}

            {addReply === comment.id ? (
              <CommentComponent
                parentId={comment.id}
                publishReply={publishReply}
              />
            ) : null}
          </div>
        ))}
      </div>
      {add ? (
        <CommentComponent parentId={parentId} publishReply={publishReply} />
      ) : null}

      <button type="button" onClick={() => addComment()}>
        New Comment
      </button>
      <button type="button" onClick={() => setShowReply((prev) => !prev)}>
        {showReply ? "Hide replies" : "Show Replies"}
      </button>
    </div>
  );
}
export default ReplySectionComponent;
