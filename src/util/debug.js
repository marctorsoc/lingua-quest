export function sleep(seconds) {
  // use as await sleep(0.5);
  // console.log("Sleeping for " + seconds + " seconds...");
  return new Promise((resolve) =>
    setTimeout(resolve, seconds * 1000)
  );
}
