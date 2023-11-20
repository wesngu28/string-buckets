import { RefObject, useState } from "react"

interface Props {
    updateCategories: (categories: Array<{name: string, items: string[]}>) => void
    categories: Array<{name: string, items: string[]}>
    modal: RefObject<HTMLDivElement>
}

export function NewCategory({updateCategories, categories, modal}: Props) {
    const [category, setCategory] = useState("")

    return (
        <div className="bg-gray-400 w-96 rounded-lg p-4 flex flex-col gap-4 items-center">
            <h2 className="text-xl">Add New Category</h2>
            <div className="flex gap-4 items-center">
                <label>Name:</label>
                <input className="text-black p-1" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <button onClick={() => {
                modal.current?.classList.toggle('hidden')
                updateCategories([...categories, {name: category, items: []}])
                setCategory("")
            }} className="bg-green-400 rounded-lg px-2 py-1 m-2 text-black">Add</button>
        </div>
    )
}