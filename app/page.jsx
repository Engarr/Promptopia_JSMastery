'use client';

import Feed from '@components/Feed';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import Loading from './loading';

const Home = () => (
  <motion.section
    className='w-full flex-center flex-col'
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}>
    <h1 className='head_text text-center'>
      Discover & Share
      <br className='min-md:hidden' />
      <span className='orange_gradient text-center'> AI-Powered Prompts</span>
    </h1>
    <p className='desc text-center'>
      Promptopia is an open-source AI prompting tool for modern world to
      discover, create and share creative prompts
    </p>
    <Suspense fallback={<Loading />}>
      <Feed />
    </Suspense>
  </motion.section>
);

export default Home;
