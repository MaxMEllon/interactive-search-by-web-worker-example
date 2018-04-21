import Fuse from 'fuse.js'

self.addEventListener('message', e => {
  const { data, pattern } = e.data;
  if (pattern.trim() === '') return data
  const fuse = new Fuse(data, {
    shouldSort: true,
    threshold: 0.1,
    location: 0,
    distance: 10,
    maxPatternLength: 64,
    minMatchCharLength: 1,
    keys: [
      'last',
      'first',
    ],
  })
  const result = fuse.search(pattern)
  self.postMessage(result)
})
