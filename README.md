# String Buckets

> A drag and drop Next.js application for ordering a bunch of strings into categories.

### Features

- Download generated buckets, maintaining category order by delineating categories as !--CATEGORY NAME--!
- Import existing buckets with the same order.

Categories
- Swap category orders by dragging them on top of each other.
- Move items between categories or move them in place within a category to swap their order.
- Remove an item from a category by clicking on the item.
- Remove a category to return its items to unsorted.

Items
- Add items through textarea input.
- Drag items to categories.
- Select multiple items with shift click.

## Installation

```
git clone https://github.com/wesngu28/string-buckets.git

cd string-buckets

npm install

npm run dev
```

#### Working Screenshot
![Sorter](/public/image.png)

## Motivation

Often, I encounter disorganized lists of strings. These lists can stem from various sources, such as tasks I need to complete or items of interest that I've lost track of. Manually sorting these lists can become tedious, so I decided to create a graphical user interface to make this less boring and also learn how to implement drag-and-drop functionality.