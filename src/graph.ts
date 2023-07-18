import { atom } from 'jotai';
import { objects as objectsAtom } from './objects';
import type { ExtractAtomValue } from 'jotai'

type OriginalObject = ExtractAtomValue<typeof objectsAtom>[number];
type ObjectWithChildrenIds = OriginalObject & { childrenIds: string[] };
type GraphObject = ObjectWithChildrenIds & { children: GraphObject[] };

export const graphAtom = atom((get) => {
  const objects = get(objectsAtom);

  const objectsWithChildrenIds: ObjectWithChildrenIds[] = objects.map((object) => ({
    ...object,
    childrenIds: objects
      .filter((child) => child.parentId ? get(child.parentId) === object.id : false)
      .map((child) => child.id)
  }));

  const rootObjects = objectsWithChildrenIds.filter((object) => !object.parentId);

  if (rootObjects.length === 0) {
    throw new Error('No root objects found');
  }

  if (rootObjects.length > 1) {
    throw new Error('Multiple root objects found');
  }

  const buildGraph = (subGraph: ObjectWithChildrenIds): GraphObject => {
    const children = subGraph.childrenIds.map((childId) => {
      const child = objectsWithChildrenIds.find((object) => object.id === childId);

      if (!child) {
        throw new Error(`Object with id ${childId} not found`);
      }

      return buildGraph(child);
    });

    return {
      ...subGraph,
      children
    };
  }

  return buildGraph(rootObjects[0]);
});
