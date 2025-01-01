import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Post, User, validationError } from '@/types';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditorType } from 'tinymce';

interface EditPostComponentProps {
  userToken: string | null;
  currentUser: User | null;
}

const EditPostComponent = ({ userToken, currentUser }: EditPostComponentProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<TinyMCEEditorType | null>(null);
  // const isPublishedRef = useRef<HTMLInputElement>(null);
  const thumbnailUrlRef = useRef<HTMLInputElement>(null);

  const [editPostError, setEditPostError] = useState<validationError | null>(null);

  const form = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const post: Post = location.state;

  const handleEditPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const content = contentRef.current?.getContent();
    // const isPublished = isPublishedRef.current?.checked;
    const thumbnailUrl = thumbnailUrlRef.current?.value;

    if (!content || content.length < 10) {
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({
        title,
        content,
        authorId: currentUser?.id,
        // isPublished,
        thumbnailUrl,
      }),
    });

    const logInRes = await res.json();
    console.log(logInRes);
    
    // add post Errors display
    if (typeof logInRes.errors !== 'undefined') {
      return setEditPostError(logInRes.errors[0]);
    }

    setEditPostError(null);
    navigate(`/`);
  };
  return (
    <Form {...form}>
      <h1 className="font-bold">Edit Post</h1>
      <form className="space-y-8 w-[70%] m-auto">
        <FormItem>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input defaultValue={post.title} id="title" type="text" name="title" ref={titleRef} />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="thumbnail">Thumbnail Link</FormLabel>
          <Input
            defaultValue={post.thumbnailUrl || ''}
            id="thumbnail"
            type="text"
            name="thumbnail"
            ref={thumbnailUrlRef}
          />
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="content">Content</FormLabel>
          <Editor
            apiKey={import.meta.env.VITE_TINY_API}
            initialValue={post.content}
            onEditorChange={(_, editor) => {
              contentRef.current = editor;
            }}
            onInit={(_, editor) => {
              contentRef.current = editor;
            }}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist',
                'autolink',
                'lists',
                'link',
                'image',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'code',
                'help',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            }}
          />
        </FormItem>
        {editPostError && <FormMessage>{editPostError.msg}</FormMessage>}
        <Button onClick={handleEditPost}>Edit Post</Button>
      </form>
    </Form>
  );
};

export default EditPostComponent;
