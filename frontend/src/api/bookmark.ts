import dotenv from 'dotenv';
dotenv.config();

const backend_url = process.env.BACKEND_URL || 'localhost:8080';

export type Bookmark = {
  id: number,
  videoId: string,
  startTime: number,
  endTime: number,
  title: string,
  notes: string,
  tagIdList: number[],
};

export type NewBookmark = {
  videoId: string,
  startTime: number,
  endTime: number,
  title: string,
  notes: string,
  tagIdList: number[],
};

export const fetchBookmarks = async (tagIdList: number[]) => {
  const endpoint = (
    tagIdList.length > 0
    ? `${backend_url}/tag/${tagIdList.join(' ')}`
    : `${backend_url}/bookmark`
  );

  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};
