import { RefObject } from "react"

interface Props {
    updateItems: (items: string[]) => void
    updateCategories: (
        categories: Array<{ name: string; items: string[] }>
      ) => void;
    items: string[]
    modal: RefObject<HTMLDivElement>
}

export function AddItems({updateItems, updateCategories, items, modal}: Props) {
    return (
        <div className="bg-gray-400 w-96 rounded-lg p-4 flex flex-col gap-4 items-center">
            <h2 className="text-xl">Set Items to Sort</h2>
            <textarea value={items.join('\n')} onChange={(e) => updateItems(e.target.value.split('\n'))} className="p-1 rounded text-black" rows={8} ></textarea>
            <button onClick={() => {
                modal.current?.classList.toggle('hidden')
                const result: {name: string, items: string[]}[] = [];
                let currentCategory: {name: string, items: string[]} | null = null;
              
                for (const line of items) {
                  if (line.startsWith("!--")) {
                    if (currentCategory) {
                      result.push(currentCategory);
                    }
                    const categoryName = line.slice(3, -3);
                    currentCategory = { name: categoryName, items: [] };
                  } else if (currentCategory) {
                    currentCategory.items.push(line);
                  }
                  items = items.filter(item => item !== line)
                }
              
                if (currentCategory) {
                  result.push(currentCategory);
                }
                if (result.length > 0) updateCategories(result)
                updateItems(Array.from(new Set(items)))
            }} className="bg-green-400 rounded-lg px-2 py-1 m-2 text-black">Add</button>
        </div>
    )
}