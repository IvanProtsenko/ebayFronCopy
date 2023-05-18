const emails = require('email-generator');
const generator = require('generate-password-browser');
import { ALL_ENG_NAMES } from './usernames';

const randomInt = (from, to) => {
  if (to < from) {
    throw new Error(`Wrong range: from ${from} to ${to}`);
  }
  const d = (to - from) * Math.random();
  return from + Math.ceil(d);
};

const shuffle = (array) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const genTwoWords = (lowercase = false) => {
  const size = ALL_ENG_NAMES.length - 1;
  const idx_first = randomInt(0, size);
  const idx_last = randomInt(0, size);
  let first_word = ALL_ENG_NAMES[idx_first].slice(1);
  let last_word = ALL_ENG_NAMES[idx_last].slice(1);

  if (lowercase) {
    first_word = first_word.toLowerCase();
    last_word = last_word.toLowerCase();
  }

  return { first_word, last_word };
};

export function genEmail() {
  let email = emails.generateEmail();

  const [tmpEmailName] = email.split('@');

  const emailName = tmpEmailName.replace('"', '');
  email = `${emailName}@outlook.com`;
  return email;
}

export function genPass() {
  const minLenth = 8;
  const maxLenth = 64;
  const { first_word, last_word } = genTwoWords();
  const nubm1 = randomInt(1, 99999).toString();
  const nubm2 = randomInt(1, 99999).toString();

  let array = [first_word, last_word, nubm1, nubm2];

  array = shuffle(array);

  let ea_pass = array.join('');

  if (ea_pass.length < minLenth)
    ea_pass = `${ea_pass}${randomInt(100000, 999999)}`;

  if (ea_pass.length > maxLenth) ea_pass = ea_pass.slice(0, maxLenth);

  return ea_pass;
}
