(async () => {
  console.log("loader.js...")

  const src = window.chrome.runtime.getURL("content.js");
  await import(src);
})();
