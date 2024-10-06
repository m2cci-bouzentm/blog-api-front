import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CiSettings } from 'react-icons/ci';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Post } from '@/types';

function truncateText(text: string): string {
  return text.length > 200 ? text.slice(0, 200) + '...' : text;
}

interface CardPostComponentProps {
  post: Post;
  userToken: string | null;
  isPostChange: boolean;
  setIsPostChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardPostComponent = ({
  post,
  userToken,
  isPostChange,
  setIsPostChange,
}: CardPostComponentProps) => {
  const [isPostMenu, setIsPostMenu] = useState<boolean>(false);
  const isPublishedRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const handlePostEdit = () => {
    navigate('edit', { state: post });
    setIsPostMenu(false);
  };
  const handlePostDelete = async () => {
    await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        commentsCount: post?.comments?.length,
      }),
    });

    setIsPostMenu(false);
    setIsPostChange(!isPostChange);
  };
  const handlePostPublish = async () => {
    let isPublished;

    if (isPublishedRef?.current?.textContent === 'Publish') {
      isPublished = true;
    } else {
      isPublished = false;
    }

    await fetch(`http://localhost:3000/posts/publish/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({
        isPublished,
      }),
    });

    setIsPostMenu(false);
    setIsPostChange(!isPostChange);
  };
  return (
    <div className="relative">
      <CiSettings
        onClick={() => setIsPostMenu(!isPostMenu)}
        className="z-10 text-xl cursor-pointer text-black absolute right-7 md:right-10 lg:right-2 top-2 transition-all hover:scale-110"
      />
      {isPostMenu && (
        <div className="comment-menu absolute right-[10%] flex flex-col items-center text-sm rounded-lg bg-[#f3f4f6f9]">
          <div
            onClick={handlePostEdit}
            className="w-full p-2 pr-8 rounded-lg cursor-pointer hover:bg-gray-200"
          >
            Edit
          </div>
          <div
            onClick={handlePostDelete}
            className="w-full p-2 pr-8 rounded-lg cursor-pointer hover:bg-gray-200"
          >
            Delete
          </div>
          <div
            onClick={handlePostPublish}
            ref={isPublishedRef}
            className="w-full p-2 pr-8 rounded-lg cursor-pointer hover:bg-gray-200"
          >
            {post.isPublished ? 'Conceal' : 'Publish'}
          </div>
        </div>
      )}
      <Link to={post.id} className="text-inherit font-normal hover:text-inherit">
        <Card className="p-3 md:p-6 w-[95%] lg:w-[400px] h-[300px] cursor-pointer transition-all">
          <div className="flex items-center">
            <Avatar>
              <AvatarImage
                src={
                  post.author?.avatarUrl?.length
                    ? post.author?.avatarUrl
                    : 'https://github.com/shadcn.png'
                }
              />
            </Avatar>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                {post.isPublished
                  ? 'Published on ' + new Date(post.publishedAt).toLocaleDateString()
                  : 'Not being published'}
              </CardDescription>
            </CardHeader>
          </div>
          <CardContent>
            <div
              className="text-justify w-[90%]"
              dangerouslySetInnerHTML={{ __html: truncateText(post.content) }}
            ></div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default CardPostComponent;
