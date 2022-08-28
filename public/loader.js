(async () => {
  console.log('loader.js...')

  const src = chrome.runtime.getURL("translate.js");
  await import(src);
})();
