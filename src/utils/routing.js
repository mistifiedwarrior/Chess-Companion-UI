const handleRouteChange = () => window && window.scrollTo(0, 0)
const onRouteChange = () => {
  handleRouteChange()
}

const redirectTo = (path, router) => {
  if (router) {
    router.push(path)
    return
  }
  if (window.location.pathname !== path) {
    window.location.assign(path)
  }
}

export {onRouteChange, redirectTo}
