export default function tws(tweet) {
  const twurl = 'https://twitter.com/intent/tweet?';
  const text = encodeURIComponent(tweet);
  const url = `${twurl}text=${text}&related=rohitkrops`;
  window.open(url, 'Share on Twitter', 'height=500, width=600');
}
