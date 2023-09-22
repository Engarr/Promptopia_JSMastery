'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);

  const handleEdit = (id) => {
    router.push(`/update-prompt?id=${id}`);
  };
  const handleDelete = async (id) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );
    if (hasConfirmed) {
      try {
        const resposne = await fetch(`/api/prompt/${id}`, {
          method: 'DELETE',
        });
        const filteredPrompts = prompts.filter((p) => p._id !== id);
        setPrompts(filteredPrompts);
        if (resposne.ok) {
          alert('Prompt has been removed');
          router.push('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPrompts(data);
    };
    if (session?.user.id) {
      fetchPosts();
    }
  }, [session]);

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
