'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const createPrompt = () => {
  const session = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });
  const createPromptHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { prompt, tag } = post;
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: prompt,
          userId: session?.data.user.id,
          tag: tag,
        }),
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      submitting={submitting}
      post={post}
      setPost={setPost}
      handleSubmit={createPromptHandler}
    />
  );
};

export default createPrompt;
