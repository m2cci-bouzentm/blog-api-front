import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import CommentComponent from './CommentComponent';
import { Comment, Post, User } from '@/types';

interface PostComponentProps {
  isLoggedIn: boolean;
  currentUser: User | null;
}
const PostComponent = ({ isLoggedIn, currentUser }: PostComponentProps) => {
  const params = useParams();
  const commentRef = useRef<HTMLInputElement>(null);

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [isCommentChange, setIsCommentChange] = useState<boolean>(false);

  useEffect(() => {
    const { id } = params;

    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => res.json())
      .then((post) => {
        setPost(post);
        setComments(post.comments);
      })
      .catch((err) => console.error(err));
  }, [params, isCommentChange]);

  const handleAddComment = async () => {
    if (!isLoggedIn) {
      return;
    }

    const comment = commentRef.current?.value;
    if (commentRef.current) {
      commentRef.current.value = '';
    }

    try {
      const res = await fetch(`http://localhost:3000/posts/${post?.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId: params.id,
          authorId: currentUser?.id,
        }),
      });
      await res.json();

      setIsCommentChange(!isCommentChange);
    } catch (err) {
      console.log(err);
    }
  };

  return post ? (
    <div className="px-32 self-center w-full space-y-8 relative tracking-tight">
      <Link to="/" className="border-none absolute top-10 left-[-180px]">
        {'< See all posts'}
      </Link>

      <div>
        <div className="date-box text-gray-500 text-sm m-0">
          Published on {new Date(post.publishedAt).toLocaleDateString()}
        </div>
        <h1 className="self-start !mt-0  text-[3rem] text-[#111111] scroll-m-20 font-extrabold lg:text-5xl">
          {post.title}
        </h1>
      </div>

      <div className="avatar-box flex items-start space-x-2">
        <Avatar>
          <AvatarImage
            src={post.author?.avatarUrl ? post.author?.avatarUrl : 'https://github.com/shadcn.png'}
          />
        </Avatar>
        <div>
          <div className="text-sm font-bold"> {post.author?.username} </div>
          <div className="text-gray-500 text-sm cursor-pointer hover:underline">
            @{post.author?.username}
          </div>
        </div>
      </div>

      <div className="text-justify leading-7 px-8">{post.content}</div>

      <div className="comments-container space-y-4 !mt-24">
        <h2 className="text-3xl font-bold text-black">Comments</h2>

        {isLoggedIn && (
          <div className="comment-input space-x-4 flex">
            <Input id="comment" name="comment" type="text" ref={commentRef} />
            <Button onClick={handleAddComment} type="submit">
              Add Comment
            </Button>
          </div>
        )}

        {comments
          ? comments.map((comment: Comment) => (
              <CommentComponent
                key={comment.id}
                currentUser={currentUser}
                post={post}
                comment={comment}
                isCommentChange={isCommentChange}
                setIsCommentChange={setIsCommentChange}
              />
            ))
          : null}
      </div>
    </div>
  ) : null;
};

export default PostComponent;
