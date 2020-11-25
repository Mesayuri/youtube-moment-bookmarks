import dotenv from 'dotenv';
dotenv.config();

const backend_url = process.env.BACKEND_URL || 'http://localhost:8000';

export type Tag = {
  id: number,
  tagName: string,
  color: string,
};

export type NewTag = {
  tagName: string,
  color: string,
};

export const fetchTagList = async () => {
  const response = await fetch(`${backend_url}/list/tag`);
  const data = await response.json();
  return data;
};

export const sendNewTag = async (newTag: NewTag) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newTag),
  };

  const response = await fetch(`${backend_url}/create/tag`, requestOptions);
  const data = await response.json();

  return data.result;
};

export const sendTagUpdate = async (tag: Tag) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(tag),
  };

  const response = await fetch(`${backend_url}/update/tag`, requestOptions);
  const data = await response.json();

  return data.result;
};
