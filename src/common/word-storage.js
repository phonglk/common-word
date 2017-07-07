import { getSync, setSync, getLocal } from '../common/storage';

export async function getKnownList() {
  const knownList = await getSync('knownList');
  const selectedWordList = await getSync('selectedWordList');
  const list = knownList[selectedWordList] || [];
  return { list, knownList, selectedWordList };
}

export async function updateKnownWord({ word }) {
  const { list, knownList, selectedWordList } = await getKnownList();
  if (!list.find(entry => entry.word === word)) {
    const newEntry = { word, date: new Date().getTime(), sentence: '' };
    list.push(newEntry);
    await setSync('knownList', Object.assign({}, knownList, {
      [selectedWordList]: list,
    }));
  }
}

export async function getWordList() {
  const wordList = await getLocal('currentWordList');
  return wordList;
}
