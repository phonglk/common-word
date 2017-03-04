export function isTopWindow() {
  return window === window.top;
}

export function getTopWindow() {
  return window.top;
}

export function isZeroIframe() {
  return window.innerWidth === 0 && window.innerHeight === 0;
}