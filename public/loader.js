(async () => {
  console.log('loader.js...')

  const src = chrome.runtime.getURL("content.js");
  await import(src);
})();
