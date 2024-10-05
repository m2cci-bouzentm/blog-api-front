import { Post } from '@/types';
import { useEffect, useState } from 'react';
import CardPostComponents from './CardPostComponents';

interface MainComponentProps {
  userToken: string | null;
}
const MainComponent = ({ userToken }: MainComponentProps) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isPostChange, setIsPostChange] = useState<boolean>(false);

  useEffect(() => {
    fetch('http://localhost:3000/posts', { headers: { Authorization: `Bearer ${userToken}` } })
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => console.error(err));
  }, [userToken, isPostChange]);

  return (
    <>
      <div className="space-y-4">
        <h1 className="font-bold text-black">Blog</h1>
        <h3>A blog built using vite & shadcn. Posts are written with TinyMCE.</h3>
      </div>
      <hr />
      <div className="cards-container grid lg:justify-items-center grid-cols-1 lg:grid-cols-2 gap-y-8">
        {posts &&
          posts.map((post) => (
            <CardPostComponents
              key={post.id}
              post={post}
              userToken={userToken}
              isPostChange={isPostChange}
              setIsPostChange={setIsPostChange}
            />
          ))}
      </div>
    </>
  );
};

export default MainComponent;
