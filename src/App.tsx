import { useState } from "react"
import { useGraph, GraphItem } from "./state"
import { useAtomValue, useSetAtom } from "jotai"

function App() {
  const graph = useGraph()

  return (
    <>
      <GraphItem 
        item={graph} 
      />
    </>
  )
}

export default App

type GraphItemProps = {
  item: GraphItem;
}

function GraphItem(props: GraphItemProps) {

  const details = useAtomValue(props.item.data)
  const [input, setInput] = useState(details.name)
  const setName = useSetAtom(props.item.data)

  const handleUpdate = () => {
    setName({
      ...details,
      name: input,
    })
  }

  return (
    <div className="m-1 p-1">
      <span className="flex gap-2">
        {">"}
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onBlur={handleUpdate} 
        />
        <pre className="text-sm">{JSON.stringify(details)}</pre>
      </span>
      <div>
        {props.item.children.map((item) => <GraphItem 
          key={item.id} 
          item={item} 
        />)}
      </div>
    </div>
  )
}