'use client';
import dynamic from 'next/dynamic';

const HistoryEditor  = dynamic(() => import('./HistoryEditor'), { ssr: false });

const CreateHistoryPage = () =>  {
  return (
    <HistoryEditor />
  );
}

export default CreateHistoryPage;
