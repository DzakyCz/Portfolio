export const useScrollAnimation = () => {
  const observe = (el: HTMLElement) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      // Trigger when 10% of the element is visible
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )
    observer.observe(el)
  }

  return { observe }
}
