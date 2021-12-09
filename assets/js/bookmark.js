window.Config.bookmarks.forEach((bookmark_group) => {
  var bookmark_section = document.querySelector('.bookmark')
  // 书签组
  var dom_bookmark_group = document.createElement('div')
  dom_bookmark_group.classList.add('bookmark-group')

  // 书签组 标题
  var dom_header = document.createElement('div')
  dom_header.classList.add('header')
  dom_header.textContent = bookmark_group.header

  // 书签
  var dom_ul = document.createElement('ul')
  bookmark_group.content.forEach((bookmark) => {
    var dom_li = document.createElement('li')
    var dom_a = document.createElement('a')

    dom_a.textContent = bookmark.name
    dom_a.href = bookmark.url
    
    dom_li.appendChild(dom_a)
    dom_ul.appendChild(dom_li)
  })

  dom_bookmark_group.appendChild(dom_header)
  dom_bookmark_group.appendChild(dom_ul)

  bookmark_section.appendChild(dom_bookmark_group)

  // https://spope.github.io/MiniMasonry.js/
  var masonry = new MiniMasonry({
    baseWidth: 200,
    container: '.bookmark',
    gutter: 30,
    surroundingGutter: false,
  })
})
