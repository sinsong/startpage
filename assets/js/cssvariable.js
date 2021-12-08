;(function () {
  // :root
  let root = document.documentElement

  for (let key in window.Config.theme)
  {
    if (window.Config.theme.hasOwnProperty(key))
    {
      // console.debug(`set css variable ${key}: ${window.Config.theme[key]}`)
      root.style.setProperty(key, window.Config.theme[key])
    }
  }
})()
