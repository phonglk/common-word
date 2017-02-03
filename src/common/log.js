/* eslint-disable no-console */
export default function log(...args) {
  console.log(...args);
}

export function info(...args) {
  console.info(...args);
}

export function warn(...args) {
  console.warn(...args);
}

export function error(...args) {
  console.error(...args);
}

export function getConsole() {
  return console;
}
