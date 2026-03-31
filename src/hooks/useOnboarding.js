const KEY = 'navme-onboarding-count'
const MAX_VISITS = 5

export function useOnboarding() {
  const getCount = () => parseInt(localStorage.getItem(KEY) ?? '0', 10)

  const shouldShow = () => getCount() < MAX_VISITS

  const recordVisit = () => {
    const current = getCount()
    localStorage.setItem(KEY, String(Math.min(current + 1, MAX_VISITS)))
  }

  const getCurrentVisit = () => Math.min(getCount() + 1, MAX_VISITS)

  const reset = () => localStorage.removeItem(KEY)

  return { shouldShow, recordVisit, getCurrentVisit, reset, MAX_VISITS }
}
