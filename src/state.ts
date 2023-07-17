import { useEffect, useState } from "react";
import { graph as buildGraph } from "./graph";
import { objects as initialObjects } from "./objects";

export type GraphItem = ReturnType<typeof buildGraph>
export type GraphItemType = GraphItem['type']

// Find the GraphItem that has a matching "type"
type ItemWithType<T extends GraphItemType> = GraphItem extends infer R
  ? R extends { type: T }
  ? R
  : never
  : never;

export const useGraph = () => {
  const [objects, setObjects] = useState(initialObjects) // [objects, setObjects
  const [graph, setGraph] = useState(buildGraph(objects))

  useEffect(() => {
    setGraph(buildGraph(objects))
  }, [objects])

  console.log({ objects })

  const updateData = <Type extends GraphItemType,>(id: string, type: Type, data: Partial<ItemWithType<Type>["data"]>) => {
    console.log({ id, type, data })

    const object = objects.find(o => o.id === id)

    if (!object) {
      throw new Error(`Could not find object with id ${id}`)
    }

    if (object.type !== type) {
      throw new Error(`Object with id ${id} is not of type ${type}`)
    }

    const updatedObject = {
      ...object,
      data: {
        ...object.data,
        ...data
      }
    }

    const index = objects.findIndex(o => o.id === id)

    const newObjects = [
      ...objects.slice(0, index),
      updatedObject,
      ...objects.slice(index + 1)
    ]

    // @ts-expect-error - idk how to fix this
    setObjects(newObjects)
  }

  return {
    state: graph,
    updateData
  }
}
