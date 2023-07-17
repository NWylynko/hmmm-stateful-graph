import { useState } from "react"
import { useGraph, GraphItem } from "./state"

function App() {

  const { state, updateData } = useGraph()

  return (
    <>
      <GraphItem item={state} updateItem={updateData} />
    </>
  )
}

export default App

type GraphItemProps = {
  item: GraphItem;
  updateItem: ReturnType<typeof useGraph>["updateData"]
}

function GraphItem(props: GraphItemProps) {

  const [name, setName] = useState(props.item.data.name)

  const handleUpdate = () => {
    props.updateItem(
      props.item.id,
      props.item.type,
      {
        name: name
      }
    )
  }

  const { ...details } = props.item.data

  return (
    <div className="m-1 p-1">
      <span className="flex gap-2">
        {">"}
        <input value={name} onChange={(e) => setName(e.target.value)} onBlur={handleUpdate} />
        <pre className="text-sm">{JSON.stringify(details)}</pre>
      </span>
      <div>
        {props.item.children.map((item) => <GraphItem key={item.id} item={item} updateItem={props.updateItem} />)}
      </div>
    </div>
  )
}