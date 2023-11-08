import { RefObject } from "react"

interface Props {
    updateCategories: (categories: Array<{name: string, items: string[]}>) => void
    updateCategory: (category: string) => void 
    categories: Array<{name: string, items: string[]}>
    category: string
    modal: RefObject<HTMLDivElement>
}

export function NewCategory({updateCategories, updateCategory, categories, category, modal}: Props) {
    return (
        <div className="bg-gray-400 w-96 rounded-lg p-4 flex flex-col gap-4 items-center">
            <h2>Add New Category</h2>
            <div className="flex gap-4">
                <label>Name: {category}</label>
                <input value={category} onChange={(e) => updateCategory(e.target.value)} />
            </div>
            <button onClick={() => {
                modal.current?.classList.toggle('hidden')
                updateCategories([...categories, {name: category, items: []}])
                updateCategory("")
            }} className="bg-green-400 rounded-lg px-2 py-1 m-2 text-black">Add</button>
        </div>
    )
}