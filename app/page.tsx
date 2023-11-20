"use client";
import { useRef, useState } from "react";
import { NewCategory } from "./components/NewCategory";
import { AddItems } from "./components/AddItems";
import { handleDownload } from "@/lib/handleDownload";
import Categories from "./components/Categories";
import { Items } from "./components/Items";

export default function Home() {
  const modal = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Array<string>>([
    "Apple",
    "Banana",
    "Orange",
    "Tomato",
    "Cabbage",
  ]);
  const [categories, setCategories] = useState<
    Array<{ name: string; items: string[] }>
  >([
    { name: "Fruits", items: ["Strawberry"] },
    { name: "Vegetable", items: ["Bok Choy"] },
  ]);
  const [modalMode, setModalMode] = useState("");
  const [selectedString, setSelectedString] = useState<Array<string>>([]);
  const [draggedCategory, setDraggedCategory] = useState<{
    name: string;
    items: string[];
  }>();

  const updateCategories = (
    categories: Array<{ name: string; items: string[] }>
  ) => setCategories(categories);
  const updateItems = (items: Array<string>) => setItems(items);
  const updateSelection = (selectedString: Array<string>) => setSelectedString(selectedString);

  function handleOnDrag(e: React.DragEvent, text: string, type?: string) {
    if (type === "category") {
      const itemIndex = categories.findIndex(
        (category) => category.name === text
      );
      setDraggedCategory(categories[itemIndex]);
    }
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
        <Categories categories={categories} updateCategories={updateCategories} items={items} updateItems={updateItems} selection={selectedString} updateSelection={updateSelection} dragHandler={handleOnDrag} dragged={draggedCategory} />
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
        <Items categories={categories} updateCategories={updateCategories} items={items} updateItems={updateItems} selection={selectedString} updateSelection={updateSelection} dragHandler={handleOnDrag} />
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
            categories={categories}
            modal={modal}
          />
        ) : (
          <AddItems updateItems={updateItems} items={items} modal={modal} />
        )}
      </div>
    </main>
  );
}
