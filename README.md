# startpage

起始页 (正在施工中)

## 使用

`index.html`: 相对路径，静态网页

## 特性

- [x] 搜索
- [x] 搜索引擎配置和切换
- [x] 书签和书签配置
- [ ] 主题系统

## 配置

`config.js` 是使用的配置文件，首次使用请复制 `config.js.template` 并且改名为 `config.js`(已加入 `.gitignore`)

配置文件大体结构
```js
var Config = {
    theme: {...},        // "主题" 系统
    searchEngine: [...], // 搜索引擎配置
    bookmarks: [...],    // 书签配置
}
```

### `theme` "主题" 系统

使用 `assets/js/cssvariable.js` 将 `theme` 中的键值对映射为 CSS 变量。

> TODO: 以后对整个样式进行重整

例如:
```js
theme: {
  "--color-text": "#adbac7",
  "--color-bg": "#22272e",
}
```
被映射为:
```css
:root
{
  --color-text: #adbac7;
  --color-bg: #22272e;
}
```
样式表中使用 `var()` 即可引用变量
```css
:root
{
    color: var(--color-text);
    background-color: var(--color-bg);
}
```

目前的配置:
| CSS variable      | 意思 |
|:------------------|:--|
|`--color-text`     | 文字颜色 |
|`--color-bg`       | 背景色 |
|`--color-primary`  | 主题色 |
|`--color-secondary`| 辅助色 |
|`--font-root`      | 默认字体 |

### `searchEngine` 搜索引擎配置

`searchEngine` 配置是一个数组，每个元素是一个对象，代表一个搜索引擎

```js
{
  name: "搜索引擎名字",
  template: "发起搜索 URL 模板", // %s 代表关键字
  icon: "搜索引擎图标"
}
```

获取 template 值，可以抄 chrome 的设置(笑，记得把关键字从别的改成 `%s`)。也可以找 `opensearch.xml`。
1. 按 `F12` 看查看器
2. 搜索 `opensearch` 或者自己找 
   ```html
   <link rel="search" type="application/opensearchdescription+xml" href="..." title="...">
   ```
3. 进入 `href` 指向的文件，查看其内容
4. 找到 `<Url>` 元素，复制他的 `template` 元素值
   ```xml
   <Url type="text/html" method="get" template="https://github.com/search?q={searchTerms}&ref=opensearch"/>
   ```
5. 将模板字符串的 `{searchTerms}` 手动替换成 `%s`。例如 `search?q={searchTerms}` 改为 `search?q=%s` 即可

### `bookmarks` 书签配置

`bookmarks` 是一个数组，其每个元素是一个书签集合

```js
{
  header: "标题",
  content: [...] // 书签内容
}
```

`content` 数组的每个元素是一个书签

```js
{ name: "链接文本", url: "链接地址" }
```

## 第三方库

使用 `curl -L` 跟随重定向，将第三方库下载到 `assets/vendor/`

### popper.js

```
Development version
https://unpkg.com/@popperjs/core@2/dist/umd/popper.js

Production version
https://unpkg.com/@popperjs/core@2
```
