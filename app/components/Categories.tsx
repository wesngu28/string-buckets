interface Props {
  categories: Array<{ name: string; items: string[] }>;
  updateCategories: (
    categories: Array<{ name: string; items: string[] }>
  ) => void;
  items: string[];
  updateItems: (items: string[]) => void;
  selection: string[];
  updateSelection: (selectedString: string[]) => void;
  dragHandler: (e: React.DragEvent, text: string, type?: string) => void;
  dragged: { name: string; items: string[] } | undefined;
}

export default function Categories({
  categories,
  updateCategories,
  items,
  updateItems,
  selection,
  updateSelection,
  dragHandler,
  dragged,
}: Props) {
  return (
    <div className="flex gap-8 flex-wrap m-8">
      {categories.map((category, i) => (
        <div
          onClick={() => {
            if (selection.length > 0) {
              const updatedCategories = categories.map((c) => {
                const newItems = c.items.filter(
                  (item) => !selection.includes(item)
                );
                if (c.name === category.name) {
                  return {
                    ...c,
                    items: [...c.items, ...selection],
                  };
                } else {
                  return {
                    ...c,
                    items: newItems,
                  };
                }
              });
              updateCategories(updatedCategories);
              const item = items.filter((item) => {
                if (!selection.includes(item)) return item;
              });
              updateItems(item);
              updateSelection([]);
            }
          }}
          draggable={true}
          onDragStart={(e) => dragHandler(e, category.name, "category")}
          onDrop={(e) => {
            if (dragged) {
              const data = e.dataTransfer.getData("text");
              const itemIndex = categories.findIndex(
                (category) => category.name === data
              );
              if (itemIndex !== -1) {
                categories[itemIndex] = {
                  name: category.name,
                  items: category.items,
                };
                categories[i] = {
                  name: dragged.name,
                  items: dragged.items,
                };
                updateCategories([...categories]);
              }
              return;
            }
            if (category.items.includes(e.dataTransfer.getData("text"))) return;
            updateItems(
              items.filter((item) => item !== e.dataTransfer.getData("text"))
            );
            const updatedCategories = categories.map((c) => {
              if (c.name === category.name) {
                return {
                  ...c,
                  items: [...c.items, e.dataTransfer.getData("text")],
                };
              } else {
                return {
                  ...c,
                  items: c.items.filter(
                    (item) => item !== e.dataTransfer.getData("text")
                  ),
                };
              }
            }) as [];
            updateCategories(updatedCategories);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          key={i}
          className="bg-gray-400 rounded-lg p-4 text-gray-800 min-h-[18rem] min-w-[18rem] h-80 overflow-y-scroll text-center"
        >
          <div className="flex gap-2 items-center justify-center">
            <p className="text-2xl">
              {category.name} - {category.items.length}
            </p>
            <button
              className="text-red-500"
              onClick={() => {
                const returnItems = items.concat(category.items);
                updateItems(returnItems);
                updateCategories(
                  categories.filter(
                    (fcategory) => fcategory.name !== category.name
                  )
                );
              }}
            >
              X
            </button>
          </div>
          {category.items.map((item, idx) => (
            <p
              key={idx}
              draggable={true}
              onClick={() => {
                if (selection) return;
                category.items = category.items.filter((name) => name !== item);
                updateItems([...items, item]);
              }}
              onDragStart={(e) => dragHandler(e, item)}
              onDrop={(e) => {
                const draggedItem = e.dataTransfer.getData("text");
                const itemIndex = category.items.indexOf(draggedItem);
                if (itemIndex !== -1) {
                  category.items[itemIndex] = category.items[idx];
                  category.items[idx] = draggedItem;
                  updateCategories([...categories]);
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
            >
              {item}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
