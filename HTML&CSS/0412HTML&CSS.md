# HTML & CSS

## HTML
<em> 斜体

generic：div、span
semantic： article、figure、mark、time

<main>网页主体，每个页面只有一个main

section 相关内容分组

<header> 表示开始信息

footer 

aside 与主体不相关的信息

## CSS

类选择器
id选择器

类选择器优先级高

## 排版

## The box model
 
 ## measurement units

 absolute: px
 relative:
  % (relative to the size of the container)
  vw / vh (relative to the viewport)
  em / rem (relative to the font size)

vh：占满了整个视域的高度。
rem： 让盒子的宽度跟着字符大小变化。

## positioning
relative：元素可以相对自己原本的位置定位，其他元素不受影响。
absolute：relative to the parent(根据容器元素来定位，但是容器元素必须是相对定位)
fixed：relative to the viewport(相对于视域进行定位)

## floating elements
 

## flex box : To lay out elements in a low or a column
direction: Row

➡️main
⬇️cross

direction: column

➡️cross
⬇️main

aligning items:

* justify-content (along the main axis)
* align-items(along the cross axis)

sizing items
* flex-basis (the initial size of a flex item)
* flex-grow (the growth factor)
* flex-shrink (the shrink factor)
* flex

## grid : To lay out elements in both rows and columns

aligning items:

* justify-items(along the horizontal axis) default-stretch
* align-items(along the vertical axis) default-stretch

## gap

* row-gap
* column-gap
* gap

placing items

* grid-row
* grid-column
* grid-area

placing items in named areas

* grid-template-areas
* grid-area

## hiding elements
display: none; 不占位
visibility: hidden; 占位

## media queries

# 字体

## styling fonts

```css
p {
  font-weight: normal;
  font-style: italic;
  font-size: 1rem;
  color: #333;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
```