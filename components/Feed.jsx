'use client';

import { useState, useEffect, Suspense } from 'react';
import PropmtCard from './PromptCard';
import { motion } from 'framer-motion';
import Loading from '@app/loading';

const PropmtCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((prompt) => (
        <PropmtCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [allPrompts, setAllPrompts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [searchResult, setSearchResult] = useState([]);

  const filterPromptsHandler = (searchText) => {
    const re = new RegExp(searchText, 'i');
    return allPrompts.filter(
      (prompt) =>
        re.test(prompt.creator.username) ||
        re.test(prompt.prompt) ||
        re.test(prompt.tag)
    );
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
    const searchResult = filterPromptsHandler(tag);
    setSearchResult(searchResult);
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPromptsHandler(e.target.value);
        setSearchResult(searchResult);
      }, 500)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setAllPrompts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or username'
          value={searchText}
          onChange={handleSearchChange}
          className='search_input peer'
        />
      </form>

      <PropmtCardList
        data={searchText ? searchResult : allPrompts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
