import { Post } from '@/types';
import { useEffect, useState } from 'react';
import CardPostComponent from './CardPostComponent';

interface MainComponentProps {
  userToken: string | null;
}
const MainComponent = ({ userToken }: MainComponentProps) => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/posts', { headers: { Authorization: `Bearer ${userToken}` } })
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      })
      .catch((err) => console.error(err));
  }, [userToken]);

  return (
    <>
      <div className="space-y-4">
        <h1 className="font-bold text-black">Blog</h1>
        <h3>A blog built using vite & shadcn. Posts are written with TinyMCE.</h3>
      </div>
      <hr />
      <div className="cards-container grid lg:justify-items-center grid-cols-1 lg:grid-cols-2 gap-y-8">
        {posts && posts.map((post) => <CardPostComponent key={post.id} post={post} />)}
      </div>
    </>
  );
};

export default MainComponent;
