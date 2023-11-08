import { RefObject } from "react"

interface Props {
    updateItems: (items: string[]) => void
    items: string[]
    modal: RefObject<HTMLDivElement>
}

export function AddItems({updateItems, items, modal}: Props) {
    return (
        <div className="bg-gray-400 w-96 rounded-lg p-4 flex flex-col gap-4 items-center">
            <h2>Set Items to Sort</h2>
            <textarea value={items.join('\n')} onChange={(e) => updateItems(e.target.value.split('\n'))} className="rounded text-black" rows={8} ></textarea>
            <button onClick={() => {
                modal.current?.classList.toggle('hidden')
                updateItems(items)
            }} className="bg-green-400 rounded-lg px-2 py-1 m-2 text-black">Add</button>
        </div>
    )
}