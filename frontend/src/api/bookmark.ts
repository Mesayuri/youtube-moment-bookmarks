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

export type NewMoment = {
  videoId: string,
  startTime: number,
  endTime: number,
  title: string,
  notes: string,
  tagIdList: number[],
};
