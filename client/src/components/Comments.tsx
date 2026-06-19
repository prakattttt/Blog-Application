import { useEffect, useState } from "react";
import {
  addPostComments,
  getPostComments,
  editPostComments,
  deletePostComments,
} from "../api/comment.api";
import Loader from "./Loader";
import toast from "react-hot-toast";

import type { CommentItem, commentInterface } from "../types/comment.types";

import useAuth from "../hooks/useAuth";
import ConfirmDelete from "./ConfirmDelete";
import EmptyComments from "./EmptyComments";
import CommentInput from "./CommentInput";
import CommentCard from "./CommentCard";

const Comments = ({
  showComments,
  postID,
  onCommentAdded,
  onCommentDeleted,
}: commentInterface) => {
  const { isLoggedIn, user } = useAuth();

  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [editCommentId, setEditCommentId] = useState("");
  const [deleteCommentId, setDeleteCommentId] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const fetchedComments = await getPostComments(postID);
        setComments(fetchedComments);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [postID]);

  const handleComment = async () => {
    if (!newComment.trim()) return;

    if (!isLoggedIn) {
      toast.error("Please login to add a comment!");
      return;
    }

    const createdComment = await addPostComments(postID, newComment);

    onCommentAdded();
    setComments(createdComment);
    setNewComment("");
  };

  const handleEditComment = (id: string, text: string) => {
    setEditCommentId(id);
    setEditedText(text);
  };

  const handleEdit = async () => {
    if (!editedText.trim()) return;

    try {
      setEditLoading(true);

      const data = await editPostComments(editCommentId, editedText);

      const updatedComments = comments.map((comment) =>
        comment._id === data.comments._id
          ? {
              ...comment,
              text: data.comments.text,
            }
          : comment,
      );

      setComments(updatedComments);
      setEditCommentId("");
      setEditedText("");

      toast.success(data.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    const data = await deletePostComments(deleteCommentId);

    const newCommentList = comments.filter(
      (comment) => comment._id !== data.comments._id.toString(),
    );

    setComments(newCommentList);
    onCommentDeleted();
    setDeleteCommentId("");
    toast.success(data.message);
  };

  if (loading) return <Loader />;

  if (comments.length === 0 && showComments) {
    return (
      <EmptyComments
        newComment={newComment}
        setNewComment={setNewComment}
        handleComment={handleComment}
      />
    );
  }

  return (
    <>
      {deleteCommentId && (
        <ConfirmDelete
          onCancel={() => setDeleteCommentId("")}
          handleDelete={handleDelete}
          loading={false}
          field="Comment"
        />
      )}

      {showComments && (
        <div className="pt-6 pb-8 border-t border-gray-200">
          <div className="flex flex-col gap-5">
            {comments.map((item) => (
              <CommentCard
                key={item._id}
                item={item}
                userId={user?._id}
                editCommentId={editCommentId}
                editedText={editedText}
                setEditedText={setEditedText}
                setEditCommentId={setEditCommentId}
                handleEditComment={handleEditComment}
                handleEdit={handleEdit}
                handleDeleteComment={setDeleteCommentId}
                editLoading={editLoading}
              />
            ))}
          </div>

          <CommentInput
            value={newComment}
            setValue={setNewComment}
            onSubmit={handleComment}
          />
        </div>
      )}
    </>
  );
};

export default Comments;
