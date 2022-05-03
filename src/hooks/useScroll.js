const useScroll = (selector) => {
  const scroll = (_e, currentSelector) => {
    if (currentSelector || selector) {
      const anchor = document.querySelector(currentSelector || selector)
      anchor.scrollIntoView({behavior: 'smooth', block: 'end'})
    } else {
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }
  return {scroll}
}

export default useScroll
