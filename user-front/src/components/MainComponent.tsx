import { Post } from '@/types';
import { useEffect, useState } from 'react';
import CardPostComponent from './CardPostComponent';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { v4 as uuidv4 } from 'uuid';

interface MainComponentProps {
  userToken: string | null;
}
const MainComponent = ({ userToken }: MainComponentProps) => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [currentPosts, setCurrentPosts] = useState<Post[] | null>(null);
  const postsPerPage: number = 4;

  useEffect(() => {
    fetch(import.meta.env.VITE_API_BASE_URL + '/posts', {
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
        setNumberOfPages(Math.ceil(posts.length / postsPerPage));
      })
      .catch((err) => console.error(err));
  }, [userToken]);

  useEffect(() => {
    const indexOfFirstPost: number = (currentPage - 1) * postsPerPage;
    const indexOfLastPost: number = currentPage * postsPerPage;
    if (posts) {
      setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
    }
  }, [posts, currentPage]);

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > numberOfPages) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="space-y-4">
        <h1 className="font-bold text-black">Blog</h1>
        <h3>A blog built using vite & shadcn. Posts are written with TinyMCE.</h3>
      </div>
      <hr />
      <div className="cards-container grid lg:justify-items-center grid-cols-1 lg:grid-cols-2 gap-y-8">
        {posts && currentPosts?.map((post) => <CardPostComponent key={post.id} post={post} />)}
      </div>

      <Pagination className="py-8">
        <PaginationContent>
          <PaginationItem onClick={() => paginate(currentPage - 1)}>
            <PaginationPrevious to="/posts" />
          </PaginationItem>

          {[...Array(numberOfPages)].map((_, i) => (
            <PaginationItem onClick={() => paginate(i + 1)} key={uuidv4()}>
              <PaginationLink isActive={currentPage === i + 1} to="/posts">
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem onClick={() => paginate(currentPage + 1)}>
            <PaginationNext to="/posts" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default MainComponent;
