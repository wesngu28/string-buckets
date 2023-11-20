"use client";
import { useRef, useState } from "react";
import { NewCategory } from "./components/NewCategory";
import { AddItems } from "./components/AddItems";
import { handleDownload } from "@/lib/handleDownload";

export default function Home() {
  const modal = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Array<string>>([]);
  const [categories, setCategories] = useState<
    Array<{ name: string; items: string[] }>
  >([]);
  const [category, setCategory] = useState("");
  const [modalMode, setModalMode] = useState("");
  const [selectedString, setSelectedString] = useState<Array<string>>([]);

  const updateCategories = (
    categories: Array<{ name: string; items: string[] }>
  ) => setCategories(categories);
  const updateCategory = (category: string) => setCategory(category);
  const updateItems = (items: Array<string>) => setItems(items);

  function handleOnDrag(e: React.DragEvent, text: string) {
    e.dataTransfer.setData("text", text);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            modal.current?.classList.toggle("hidden");
            setModalMode("Categories");
          }}
          className="bg-green-400 rounded-lg px-2 py-1 m-2 text-black"
        >
          Add Category
        </button>
        <button
          className="bg-green-400 rounded-lg px-2 py-1 m-2 text-black"
          onClick={() => handleDownload(categories)}
        >
          Download
        </button>
        <div className="flex gap-8 flex-wrap m-8">
          {categories.map((category, i) => (
            <div
              onClick={() => {
                if (selectedString.length > 0) {
                  const updatedCategories = categories.map((c) => {
                    const newItems = c.items.filter(item => {
                      if (!selectedString.includes(item)) return item
                    })
                    if (c.name === category.name) {
                      return {
                        ...c,
                        items: [...c.items, ...selectedString],
                      };
                    } else {
                      return {
                        ...c,
                        items: newItems,
                      }
                    }
                  }) as [];
                  setCategories(updatedCategories);
                  const item = items.filter(item => {
                    if (!selectedString.includes(item)) return item
                  })
                  setItems(item);
                  setSelectedString([]);
                }
              }}
              onDrop={(e) => {
                if (category.items.includes(e.dataTransfer.getData("text")))
                  return;
                setItems(
                  items.filter(
                    (item) => item !== e.dataTransfer.getData("text")
                  )
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
                      items: c.items.filter(item => item !== e.dataTransfer.getData("text")),
                    }
                  }
                }) as [];
                setCategories(updatedCategories);
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              key={i}
              className="bg-gray-400 rounded-lg p-4 text-gray-800 min-h-[18rem] min-w-[18rem] h-80 overflow-y-scroll text-center"
            >
              <div className="flex gap-2 items-center justify-center">
                <p className="text-2xl">{category.name}</p>
                <button className="text-red-500"
                  onClick={() => {
                    const returnItems = items.concat(category.items);
                    setItems(returnItems);
                    setCategories(
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
                    category.items = category.items.filter(name => name !== item)
                    setItems([...items, item])
                  }}
                  onDragStart={(e) => handleOnDrag(e, item)}
                  onDrop={(e) => {
                    const draggedItem = e.dataTransfer.getData("text");
                    const itemIndex = category.items.indexOf(draggedItem);
                    if (itemIndex !== -1) {
                      category.items[itemIndex] = category.items[idx];
                      category.items[idx] = draggedItem;
                      setCategories([...categories]);
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
      </div>
      <div className="flex flex-col items-center">
        <div className="flex gap-2">
          <button
            onClick={() => {
              modal.current?.classList.toggle("hidden");
              setModalMode("Category");
            }}
            className="bg-green-400 rounded-lg px-2 py-1 mb-4 text-black"
          >
            Set Items
          </button>
          <button
            onClick={() => setSelectedString([])}
            className="bg-green-400 rounded-lg px-2 py-1 mb-4 text-black"
          >
            Clear Select
          </button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {Array.from(new Set(items)).map((string, idx) => (
            <p
              draggable={true}
              key={string}
              onClick={() => setSelectedString([...selectedString, string])}
              onDragStart={(e) => handleOnDrag(e, string)}
              onDrop={(e) => {
                const draggedItem = e.dataTransfer.getData("text");
                const itemIndex = items.indexOf(draggedItem);
                if (itemIndex !== -1) {
                  items[itemIndex] = items[idx];
                  items[idx] = draggedItem;
                  setCategories([...categories]);
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
              }}
            >
              {string}
            </p>
          ))}
        </div>
      </div>
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget)
            modal.current?.classList.toggle("hidden");
        }}
        ref={modal}
        className="absolute hidden flex items-center justify-center inset-0 w-screen h-screen bg-[#000000e1]"
      >
        {modalMode === "Categories" ? (
          <NewCategory
            updateCategories={updateCategories}
            updateCategory={updateCategory}
            categories={categories}
            category={category}
            modal={modal}
          />
        ) : (
          <AddItems updateItems={updateItems} items={items} modal={modal} />
        )}
      </div>
    </main>
  );
}
