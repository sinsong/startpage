;(function(){
  // dom
  /** @type {HTMLDivElement} */
  let searchbar = document.querySelector('.searchbar')
  /** @type {HTMLInputElement} */
  let searchKeyword = searchbar.querySelector('#search')
  /** @type {HTMLButtonElement} */
  let selector = searchbar.querySelector('#search-engine-selector')
  /** @type {HTMLDivElement} */
  let selection = document.querySelector('#search-engine-selections')
  
  // 搜索模板
  var search_template = null

  // 搜索条实现: 搜索条焦点 == 输入框焦点

  // 点击 搜索条 -> 输入栏获得焦点
  searchbar.addEventListener('click', ()=>{
    searchKeyword.focus()
  })
  // 输入栏焦点 -> 搜索条 .active
  searchKeyword.addEventListener('focusin', ()=>{
    searchbar.classList.add('active')
  })
  searchKeyword.addEventListener('focusout', ()=>{
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

  // 添加搜索引擎图标
  window.Config.searchEngine.forEach((value) => {
    var searchEngine = document.createElement('button')
    searchEngine.style.backgroundImage = `url(${value.icon})`
    searchEngine.alt = value.name
    searchEngine.classList.add('search-engine')

    // 切换搜索引擎
    searchEngine.addEventListener('click', ()=>{
      search_template = value.template
      document.querySelectorAll('.search-engine').forEach((elem)=>{
        elem.classList.remove('active')
      })
      searchEngine.classList.add('active')
      selector.style.backgroundImage = `url(${value.icon})`
      hide()
      searchKeyword.focus() // 激活输入
    })

    selection.appendChild(searchEngine)
  })

  // 默认使用第一个搜索引擎 - 帮你点一下
  selection.children[0].dispatchEvent(new MouseEvent('click'))
  // 这里还被迫 searchKeyword.focus()
  // 一定是特性！
  
  // 搜索栏键盘操作

  // 搜索
  function search()
  {
    var keyword = encodeURIComponent(searchKeyword.value)
    var targetURL = search_template.replace('%s', keyword)

    try
    {
      window.location.assign(targetURL)
    }
    catch(error)
    {
      console.error(`${typeof error}: ${error.name} ${error.message}`);
    }
    finally
    {
      searchKeyword.value = ""
    }
  }

  // tab
  function tabkey()
  {
    show()
  }

  searchKeyword.addEventListener('keydown', (event)=>{
    // key 会有合并的按键 code 会分开
    // 例如左右 Control 主键盘和小键盘的 Enter
    switch (event.key)
    {
    case 'Tab':
      tabkey()
      break
    case 'Enter':
      search()
      break
    default:
      return;
      break
    }
  })
})()
