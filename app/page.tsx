"use client"
import { useRef, useState } from "react"

const strings = `DeAndre Hopkins
Marlon Mack
Marquise Brown
Drake London
Kyle Pitts
JaMarr Chase
DJ Moore
Trey Lance
CeeDee Lamb
Caleb Williams
Amon-Ra St Brown
Gardner Minshew`

export default function Home() {
  const modal = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState<Array<{name: string, items: string[]}>>([])
  const [category, setCategory] = useState("")

  function handleOnDrag(e: React.DragEvent, text: string) {
    e.dataTransfer.setData("text", text)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <div className="flex flex-col items-center">
        <button onClick={() => {
          modal.current?.classList.toggle('hidden')
        }} className="bg-green-400 rounded-lg px-2 py-1 m-2 text-black">+</button>
      <div className="flex gap-8 flex-wrap m-8">
        {categories.map(category => 
          <div onDrop={(e) => {
            setItems(items.filter(item => item !== e.dataTransfer.getData("text")))
            const updatedCategories = categories.map((c) => {
              if (c.name === category.name) {
                return {
                  ...c,
                  items: [...c.items, e.dataTransfer.getData("text")],
                };
              }
              return c
            }) as [];
            setCategories(updatedCategories);
          }} onDragOver={(e) => {
            e.preventDefault()
          }} className="bg-gray-400 rounded-lg p-4 text-gray-800 min-h-[18rem] min-w-[18rem] text-center">
            <p className="text-2xl">{category.name}</p>
            {category.items.map(item => <p>{item}</p>)}
          </div>
        )}
      </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {items.map(string => 
          <p 
            draggable={true} 
            key={string}
            onDragStart={(e) => handleOnDrag(e, string)}
          >
            {string}
          </p>)}
      </div>
      <div ref={modal} className="absolute hidden flex items-center justify-center inset-0 w-screen h-screen bg-[#000000e1]">
        <div className="bg-gray-400 w-96 rounded-lg p-4 flex flex-col gap-4 items-center">
          <h2>Add New Category</h2>
          <div className="flex gap-4">
            <label>Name: {category}</label>
            <input value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
          <button onClick={() => {
            modal.current?.classList.toggle('hidden')
            setCategories([...categories, {name: category, items: []}])
            setCategory("")
          }} className="bg-green-400 rounded-lg px-2 py-1 m-2 text-black">Add</button>
        </div>
      </div>
    </main>
  )
}
