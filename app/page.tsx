"use client"
import { useState } from "react"

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

  const [items, setItems] = useState(strings.split('\n'))

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 relative">
      <div className="flex gap-4 flex-wrap">
        {items.map(string => <p key={string}>{string}</p>)}
      </div>
    </main>
  )
}
