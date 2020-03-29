const sortByStars = (a, b) => {
  if (a.stargazers_count < b.stargazers_count) return 1
  if (a.stargazers_count > b.stargazers_count) return -1
  return 0
}

const sortByForks = (a, b) => {
  if (a.forks_count < b.forks_count) return 1
  if (a.forks_count > b.forks_count) return -1
  return 0
}

const sortByWatchers = (a, b) => {
  if (a.watchers_count < b.watchers_count) return 1
  if (a.watchers_count > b.watchers_count) return -1
  return 0
}

const sortByIssues = (a, b) => {
  if (a.open_issues_count < b.open_issues_count) return 1
  if (a.open_issues_count > b.open_issues_count) return -1
  return 0
}

const sortByName = (a, b) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
  return 0
}

const sortByDate = (a, b) => {
  const x = new Date(a.pushed_at).toLocaleDateString("en-CA")
  const y = new Date(b.pushed_at).toLocaleDateString("en-CA")
  if (x < y) return 1
  if (x > y) return -1
  return 0
}

export { sortByStars, sortByForks, sortByWatchers, sortByIssues, sortByName, sortByDate }