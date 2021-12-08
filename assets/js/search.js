;(function(){
  // dom
  let searchbar = document.querySelector('.searchbar')
  let search = searchbar.querySelector('#search')
  let selector = searchbar.querySelector('#search-engine-selector')
  let search_engine_selection = document.querySelector('#search-engine-selections')
  
  // 搜索模板
  var search_template = null

  // 搜索条实现: 搜索条焦点 == 输入框焦点
  searchbar.addEventListener('click', ()=>{
    search.focus()
  })
  search.addEventListener('focusin', ()=>{
    searchbar.classList.add('active')
  })
  search.addEventListener('focusout', ()=>{
    searchbar.classList.remove('active')
  })

  // icon 和 popper
  var search_engine_popper = Popper.createPopper(selector, search_engine_selection, {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5]
        }
      }
    ]
  })

  function hide()
  {
    search_engine_selection.removeAttribute('data-show')
  }

  selector.addEventListener('click', (event)=>{
    if (search_engine_selection.getAttribute('data-show') != null)
    {
      hide()
      return
    }
 
    search_engine_selection.setAttribute('data-show', '')
    search_engine_popper.update()
    event.stopPropagation() // 阻止冒泡，不会激活输入
  })

  // 搜索引擎切换
  icon = selector.querySelector('img')
  // 添加搜索引擎图标
  window.Config.searchEngine.forEach((value) => {
    var searchEngine = document.createElement('img')
    searchEngine.src = value.icon
    searchEngine.alt = value.name
    searchEngine.classList.add('search-engine')

    // 切换搜索引擎
    searchEngine.addEventListener('click', ()=>{
      search_template = value.template
      document.querySelectorAll('.search-engine').forEach((elem)=>{
        elem.classList.remove('active')
      })
      searchEngine.classList.add('active')
      icon.src = value.icon
      hide()
      search.focus() // 激活输入
    })

    search_engine_selection.appendChild(searchEngine)
  })
  // 默认使用第一个搜索引擎 - 帮你点一下
  search_engine_selection.children[0].dispatchEvent(new MouseEvent('click'))
  
  // 搜索
  search.addEventListener('keydown', (event)=>{
    if (!( event.keyCode == 13)) return
    var keyword = encodeURIComponent(search.value)
    var targetURL = search_template.replace('%s', keyword)

    window.location.assign(targetURL)
    search.value = ""
  })
})()
