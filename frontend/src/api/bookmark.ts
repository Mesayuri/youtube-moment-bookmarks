import dotenv from 'dotenv';
dotenv.config();

// TODO: process.env.BACKEND_URL is undefined
const backend_url = process.env.BACKEND_URL || 'http://localhost:8000';

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

export const sendNewBookmark = async (newBookmark: NewBookmark) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newBookmark),
  };

  const endpoint = `${backend_url}/create/bookmark`;
  const response = await fetch(endpoint, requestOptions);
  const data = await response.json();

  return data.result;
};

export const sendBookmarkUpdate = async (bookmark: Bookmark) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(bookmark),
  };

  const endpoint = `${backend_url}/create/bookmark`;
  const response = await fetch(endpoint, requestOptions);
  const data = await response.json();

  return data.result;
};
