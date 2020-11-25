import { Tag } from './api/tag';

export const convertTime2Str = (sec: number): string => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor(sec / 60) % 60;
  const seconds = ('0' + sec % 60).slice(-2);

  if (hours === 0) {
    return `${minutes}:${seconds}`;
  } else {
    return `${hours}:${('0' + minutes).slice(-2)}:${seconds}`;
  }
};

export const validateTimeFormat = (str: string): boolean => {
  // e.g. 1:11:11, 1:11
  const hmsPattern = /^(1[0-1]:|\d:)?[0-5]?\d:[0-5]?\d$/g;
  // e.g. 177s
  const secPattern = /\d{1,5}s$/g;

  const hmsResult = hmsPattern.test(str);
  const secResult = secPattern.test(str);
  const result = hmsResult || secResult;

  return result;
};

export const convertStr2Time = (str: string) => {
  const hmsPattern = /^(1[0-1]:|\d:)?[0-5]?\d:[0-5]?\d$/g;
  const secPattern = /\d{1,5}s$/g;

  if (hmsPattern.test(str) === true) {
    const hmsSplitter = /[:]/;
    const hmsTimesStr = str.split(hmsSplitter);
    const hmsTimes = hmsTimesStr.map(n => parseInt(n));

    switch (hmsTimes.length) {
      case 2:
        return 60 * hmsTimes[0] + hmsTimes[1];
  
      case 3:
        return 3600 * hmsTimes[0] + 60 * hmsTimes[1] + hmsTimes[2];
    
      default:
        break;
    }
  } else if (secPattern.test(str)) {
    const secSplitter = /s/;
    return parseInt(str.split(secSplitter)[0]);
  }

  return 0;
};

// const youtubeWatchUrl = 'www.youtube.com/watch';
// const youtubeEmbedUrl = 'https://youtu.be/';
// const youtubeVideoIdLen = 11;
export const validateVideoIdFormat = (str: string): boolean => {
  const pattern = /^(https:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtube\.com\/watch\?\S+&v=|youtu\.be\/)?\S{11}/;
  return pattern.test(str);
};

export const trimVideoId = (str: string) => {
  const pattern = /^(https:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtube\.com\/watch\?\S+&v=|youtu\.be\/)?/;
  const endPattern = /&\S+/;

  const trimmed = str.replace(pattern, '').replace(endPattern, '');
  return trimmed;
};

export const filterTags = (tags: Tag[], tagIdList: number[]) => {
  return (
    tags.filter(
      tag => tagIdList.some(tagId => tagId === tag.id)
    )
  );
}
