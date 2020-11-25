import {
  validateTimeFormat, convertTime2Str, convertStr2Time, validateVideoIdFormat,
  trimVideoId, filterTags
} from 'src/utils';
import { Tag } from 'src/API';

test('validate time format', () => {
  expect(validateTimeFormat('1:1')).toBe(true);
  expect(validateTimeFormat('0:02')).toBe(true);
  expect(validateTimeFormat('1:11')).toBe(true);
  expect(validateTimeFormat('11:1:11')).toBe(true);
  expect(validateTimeFormat('11:11:11')).toBe(true);
  expect(validateTimeFormat('11s')).toBe(true);

  expect(validateTimeFormat('11')).toBe(false);
  expect(validateTimeFormat('12:1:11')).toBe(false);
  expect(validateTimeFormat('11:60')).toBe(false);
  expect(validateTimeFormat('60:11')).toBe(false);
});

// pattern matchに使ったパターンは変形？されるので，関数の外に出すとエラーの原因になる
test('convert time to string', () => {
  expect(convertTime2Str(2)).toBe('0:02');
  expect(convertTime2Str(59)).toBe('0:59');
  expect(convertTime2Str(60)).toBe('1:00');
  expect(convertTime2Str(60 * 60)).toBe('1:00:00');
});

test('convert string to time', () => {
  expect(convertStr2Time('0:02')).toBe(2);
  expect(convertStr2Time('0:59')).toBe(59);
  expect(convertStr2Time('1:00')).toBe(60);
  expect(convertStr2Time('1:00:00')).toBe(60 * 60);
  expect(convertStr2Time('100s')).toBe(100);

  expect(convertStr2Time('unexpected string')).toBe(0);
  expect(convertStr2Time('02')).toBe(0);
});

test('validate video id format', () => {
  const videoId = 'thisissampl';
  expect(validateVideoIdFormat('12345678901')).toBe(true);
  expect(validateVideoIdFormat(`${videoId}`)).toBe(true);
  expect(validateVideoIdFormat(`www.youtube.com/watch?v=${videoId}`)).toBe(true);
  expect(validateVideoIdFormat(`https://www.youtube.com/watch?v=${videoId}`)).toBe(true);
  expect(validateVideoIdFormat(`https://www.youtube.com/watch?v=${videoId}?list=mylist`)).toBe(true);
  expect(validateVideoIdFormat(`https://www.youtube.com/watch?index=1&v=${videoId}?list=mylist`)).toBe(true);
  expect(validateVideoIdFormat(`https://youtu.be/${videoId}`)).toBe(true);

  expect(validateVideoIdFormat(`https://www.youtube.com/watch?index=1?list=mylist`)).toBe(false);
});

test('trim video id', () => {
  const videoId = 'thisissampl';
  expect(trimVideoId(`${videoId}`)).toBe(videoId);
  expect(trimVideoId(`www.youtube.com/watch?v=${videoId}`)).toBe(videoId);
  expect(trimVideoId(`https://www.youtube.com/watch?v=${videoId}`)).toBe(videoId);
  expect(trimVideoId(`https://youtu.be/${videoId}`)).toBe(videoId);
  expect(trimVideoId(`https://www.youtube.com/watch?v=${videoId}&list=mylist`)).toBe(videoId);
  expect(trimVideoId(`https://www.youtube.com/watch?t=120s&v=${videoId}&list=mylist`)).toBe(videoId);
  expect(trimVideoId(`https://www.youtube.com/watch?t=120s&v=${videoId}&list=mylist&index=1`)).toBe(videoId);
});

test('filter tags', () => {
  const t = (id: number): Tag => (
    { id, tagName: 'sample', color: '#ffffff' }
  );

  expect(filterTags([t(1)], [0])).toEqual([]);
  expect(filterTags([t(1)], [1])).toEqual([t(1)]);
  expect(filterTags([t(1)], [1, 2])).toEqual([t(1)]);
  expect(filterTags([t(1), t(2), t(3)], [1, 2])).toEqual([t(1), t(2)]);
  expect(filterTags([t(1), t(2), t(3)], [])).toEqual([]);
  expect(filterTags([t(1), t(2), t(3)], [0])).toEqual([]);
  expect(filterTags([t(1), t(1), t(3)], [1, 2])).toEqual([t(1), t(1)]);
});
