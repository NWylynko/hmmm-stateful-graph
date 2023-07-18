import { atom, type Atom } from 'jotai'

type UUID = ReturnType<typeof crypto.randomUUID>

function createObject<Type extends string, Data extends object, Parent extends Atom<UUID> | undefined>(type: Type, data: Data, parentId: Parent) {
  return atom({
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    parentId,
    type,
    data: atom(data)
  })
}

const tree = createObject('Tree', {
  name: 'Giant Oak',
}, undefined)

const squirrel1 = createObject('Squirrel', {
  name: 'Bob',
  color: 'Red'
}, atom((get) => get(tree).id))

const squirrel2 = createObject('Squirrel', {
  name: 'Alice',
  color: 'Grey'
}, atom((get) => get(tree).id))

const squirrel3 = createObject('Squirrel', {
  name: 'Chuck',
  color: 'Black'
}, atom((get) => get(tree).id))

const acorn1 = createObject('Acorn', {
  name: 'Golden Acorn',
  taste: 'Sweet and Crunchy'
}, atom((get) => get(squirrel1).id))

const acorn2 = createObject('Acorn', {
  name: 'Mighty Acorn',
  taste: 'Smooth and Nutty'
}, atom((get) => get(squirrel1).id))

const acorn3 = createObject('Acorn', {
  name: 'Ancient Acorn',
  taste: 'Moldy and Bitter'
}, atom((get) => get(squirrel2).id))

const acorn4 = createObject('Acorn', {
  name: 'Lucky Acorn',
  taste: 'Rich and Buttery'
}, atom((get) => get(squirrel2).id))

const acorn5 = createObject('Acorn', {
  name: 'Invisible Acorn',
  taste: 'Mysteriously Flavorless'
}, atom((get) => get(squirrel3).id))

const acorn6 = createObject('Acorn', {
  name: 'Quantum Acorn',
  taste: 'Tastes different each time!'
}, atom((get) => get(squirrel3).id))

const squirrel4 = createObject('Squirrel', {
  name: 'Eve',
  color: 'Brown'
}, atom((get) => get(tree).id))

const squirrel5 = createObject('Squirrel', {
  name: 'Frank',
  color: 'Red'
}, atom((get) => get(tree).id))

const nest1 = createObject('Nest', {
  name: 'Soft Nest',
  comfort: 'Very Comfy'
}, atom((get) => get(tree).id))

const nest2 = createObject('Nest', {
  name: 'High Nest',
  comfort: 'Great View, Less Comfort'
}, atom((get) => get(tree).id))

const bird1 = createObject('Bird', {
  name: 'Chirpy',
  color: 'Yellow'
}, atom((get) => get(nest1).id))

const bird2 = createObject('Bird', {
  name: 'Feather',
  color: 'Blue'
}, atom((get) => get(nest2).id))

const acorn7 = createObject('Acorn', {
  name: 'Musical Acorn',
  taste: 'Sings when you bite!'
}, atom((get) => get(squirrel4).id))

const acorn8 = createObject('Acorn', {
  name: 'Spicy Acorn',
  taste: 'Hotter than a chili pepper'
}, atom((get) => get(squirrel5).id))

const surprise1 = createObject('Surprise', {
  name: 'Mysterious Map',
  detail: 'A map to hidden treasure!',
}, atom((get) => get(bird1).id))

const surprise2 = createObject('Surprise', {
  name: 'Shiny Key',
  detail: 'A key to an unknown lock...',
}, atom((get) => get(bird2).id))

export const objects = atom((get) => [
  get(tree),
  get(squirrel1), get(squirrel2), get(squirrel3), get(squirrel4), get(squirrel5),
  get(acorn1), get(acorn2), get(acorn3), get(acorn4), get(acorn5), get(acorn6), get(acorn7), get(acorn8),
  get(nest1), get(nest2),
  get(bird1), get(bird2),
  get(surprise1), get(surprise2)
].sort(() => Math.random() - 0.5))
