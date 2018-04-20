function timeSince(time) {

  const now = new Date();
  const then = new Date(time * 1000);
  const minSince = (now - then) / (1000 * 60);

  if (minSince < 60) {
    return `${Math.round(minSince)} minutes ago`;
  }
  return `${Math.round(minSince / 60)} hours ago`;
}