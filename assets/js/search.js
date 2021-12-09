;(function(){
  // dom
  let searchbar = document.querySelector('.searchbar')
  let search = searchbar.querySelector('#search')
  let selector = searchbar.querySelector('#search-engine-selector')
  let selection = document.querySelector('#search-engine-selections')
  
  // 搜索模板
  var search_template = null

  // 搜索条实现: 搜索条焦点 == 输入框焦点

  // 点击 搜索条 -> 输入栏获得焦点
  searchbar.addEventListener('click', ()=>{
    search.focus()
  })
  // 输入栏焦点 -> 搜索条 .active
  search.addEventListener('focusin', ()=>{
    searchbar.classList.add('active')
  })
  search.addEventListener('focusout', ()=>{
    searchbar.classList.remove('active')
  })

  // icon 和 popper
  var search_engine_popper = Popper.createPopper(selector, selection, {
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

  function show()
  {
    selection.setAttribute('data-show', '')
    search_engine_popper.update()
    document.addEventListener('click', () => { hide() }, {once: true}) // 点一下其他地方隐藏选项
  }
  function hide()
  {
    selection.removeAttribute('data-show')
  }

  // 点击 搜索引擎切换按钮
  selector.addEventListener('click', (event)=>{
    if (selection.getAttribute('data-show') != null)
    {
      hide()
      return
    }
    show()
    event.stopPropagation() // 阻止冒泡，不会激活输入
  })

  // 搜索引擎切换按钮的图标
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

    selection.appendChild(searchEngine)
  })

  // 默认使用第一个搜索引擎 - 帮你点一下
  selection.children[0].dispatchEvent(new MouseEvent('click'))
  
  // 发起搜索
  search.addEventListener('keydown', (event)=>{
    if (!( event.keyCode == 13)) return
    var keyword = encodeURIComponent(search.value)
    var targetURL = search_template.replace('%s', keyword)

    window.location.assign(targetURL)
    search.value = ""
  })
})()
