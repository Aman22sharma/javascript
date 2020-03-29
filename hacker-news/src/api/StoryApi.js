import axios from "axios";

const MAX_ITEMS = 10;

const getItems = async items => {
  const urlsToGet = items
    .slice(0, MAX_ITEMS)
    .map(i => `https://hacker-news.firebaseio.com/v0/item/${i}.json`);
  const result = await Promise.all(urlsToGet.map(url => axios.get(url)));
  return result.map(item => item.data);
};

const getStories = async () => {
  const urls = [
    `https://hacker-news.firebaseio.com/v0/topstories.json`,
    `https://hacker-news.firebaseio.com/v0/newstories.json`,
    `https://hacker-news.firebaseio.com/v0/askstories.json`,
    `https://hacker-news.firebaseio.com/v0/showstories.json`,
    `https://hacker-news.firebaseio.com/v0/jobstories.json`
  ];

  const [
    topIndexes,
    latestIndexes,
    askIndexes,
    showIndexes,
    jobIndexes
  ] = await Promise.all(urls.map(url => axios.get(url)));

  const topStories = await getItems(topIndexes.data);
  const latestStories = await getItems(latestIndexes.data);
  const askStories = await getItems(askIndexes.data);
  const showStories = await getItems(showIndexes.data);
  const jobStories = await getItems(jobIndexes.data);

  return {
    topStories,
    latestStories,
    askStories,
    showStories,
    jobStories
  };
};

export default {
  getStories
};
