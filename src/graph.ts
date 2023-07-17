import type { objects as objectsData } from './objects';

type OriginalObject = typeof objectsData[number];
type ObjectWithChildrenIds = OriginalObject & { childrenIds: string[] };
type GraphObject = ObjectWithChildrenIds & { children: GraphObject[] };

export const graph = (objects: OriginalObject[]): GraphObject => {
  const objectsWithChildrenIds: ObjectWithChildrenIds[] = objects.map((object) => ({
    ...object,
    childrenIds: objects
      .filter((child) => child.parentId === object.id)
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
};
