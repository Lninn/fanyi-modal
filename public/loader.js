(async () => {
  console.log('loader.js...')

  console.log(chrome.runtime.getManifest())

  const src = chrome.runtime.getURL("content.js");
  await import(src);
})();
