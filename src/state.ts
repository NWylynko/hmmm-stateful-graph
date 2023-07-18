import { useAtomValue } from "jotai";
import { graphAtom } from "./graph";
import type { ExtractAtomValue } from 'jotai'

export type GraphItem = ExtractAtomValue<typeof graphAtom>

export const useGraph = () => {
  return useAtomValue(graphAtom);
}
