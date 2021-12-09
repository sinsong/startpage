;(function () {
  var clock = document.querySelector('section.clock')
  var time = clock.querySelector('#time')
  // var date = clock.querySelector('#date')
  // 不知道要不要进度条

  function renderTime()
  {
    let now = new Date()

    let H = now.getHours().toString().padStart(2, '0')
    let M = now.getMinutes().toString().padStart(2, '0')
    // let S = now.getSeconds().toString().padStart(2, '0')

    // let Y = now.getFullYear().toString()
    // let m = (now.getMonth() + 1).toString().padStart(2, '0')
    // let d = now.getDate().toString().padStart(2, '0')

    let timestring = `${H}:${M}`
    // let datestring = `${m}-${d}`

    if (time.textContent != timestring)
    {
      time.textContent = timestring
    }
    
    // if (date.textContent != datestring)
    // {
    //   date.textContent = datestring
    // }

    requestAnimationFrame(renderTime)
  }
  requestAnimationFrame(renderTime)
})()
