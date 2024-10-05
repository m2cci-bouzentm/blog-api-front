import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Comment, Post, User } from '@/types';
import { useRef, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface CommentComponentProps {
  userToken: string | null;
  currentUser: User | null;
  post: Post;
  comment: Comment;
  isCommentChange: boolean;
  setIsCommentChange: (state: boolean) => void;
}

const CommentComponent = ({
  userToken,
  currentUser,
  post,
  comment,
  isCommentChange,
  setIsCommentChange,
}: CommentComponentProps) => {
  const [isCommentMenu, setIsCommentMenu] = useState<boolean>(false);

  const [isEditingComment, setIsEditingComment] = useState<boolean>(false);

  const updatedCommentRef = useRef<HTMLInputElement>(null);

  const toggleMenu = () => {
    setIsCommentMenu(!isCommentMenu);
  };
  const openCommentEditForm = () => {
    setIsCommentMenu(false);
    setIsEditingComment(true);
  };
  const closeCommentEditForm = () => {
    setIsEditingComment(false);
  };
  const handleCommentEdit = async () => {
    if (!updatedCommentRef.current?.value) {
      return;
    }

    const res = await fetch(`http://localhost:3000/posts/${post.id}/comments/${comment.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        content: updatedCommentRef.current?.value,
        authorId: comment.authorId,
      }),
    });
    const data = await res.json();
    console.log(data);

    setIsCommentChange(!isCommentChange);
    closeCommentEditForm();
  };
  const handleCommentDelete = async () => {
    await fetch(`http://localhost:3000/posts/${post.id}/comments/${comment.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        authorId: comment.authorId,
      }),
    });

    setIsCommentMenu(false);
    setIsCommentChange(!isCommentChange);
  };
  return (
    <div
      data-id={comment.id}
      className="comment-container flex items-center space-x-4 !my-8 relative"
    >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <div>
        <div className="text-gray-500 text-sm">
          <span className="font-bold cursor-pointer hover:underline">
            @{comment.author?.username}
          </span>
          <br />
          <span>Published on {new Date(comment.publishedAt).toLocaleDateString()}</span>
        </div>
        <p> {comment.content}</p>
      </div>

      {currentUser?.role === 'AUTHOR' && (
        <div
          onClick={toggleMenu}
          className="comment-setting absolute right-0 font-bold cursor-pointer text-xl hover:scale-[105%]"
        >
          <span>...</span>
        </div>
      )}

      {isCommentMenu && currentUser?.role === 'AUTHOR' && (
        <div className="comment-menu absolute right-[10%] flex flex-col items-center text-sm rounded-lg bg-[#f3f4f6b5]">
          <div
            onClick={openCommentEditForm}
            className="w-full p-2 pr-8 rounded-lg cursor-pointer hover:bg-gray-200"
          >
            Edit
          </div>
          <div
            onClick={handleCommentDelete}
            className="w-full p-2 pr-8 rounded-lg cursor-pointer hover:bg-gray-200"
          >
            Delete
          </div>
        </div>
      )}

      {isEditingComment && (
        <>
          <div
            id="overlay"
            className="fixed left-[-500px] w-[300%] z-10 inset-0 bg-black bg-opacity-50"
          ></div>
          <div className="comment-edit-input absolute sm:relative space-x-4 z-20 flex items-center p-0 lg:py-2 lg:px-4 rounded-lg ">
            <Input
              id="comment-edit"
              name="comment-edit"
              type="text"
              ref={updatedCommentRef}
              className="border-[1px] h-[30px]"
            />
            <Button className="h-7 lg:h-10" onClick={handleCommentEdit}>
              Edit
            </Button>
            <Button className="h-7 lg:h-10" onClick={closeCommentEditForm} variant="destructive">
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentComponent;
