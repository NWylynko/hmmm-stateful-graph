
function createObject<Type extends string, Data extends object, Parent extends string | undefined>(type: Type, data: Data, parentId: Parent) {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    parentId,
    type,
    data
  }
}

const tree = createObject('Tree', {
  name: 'Giant Oak',
}, undefined)

const squirrel1 = createObject('Squirrel', {
  name: 'Bob',
  color: 'Red'
}, tree.id)

const squirrel2 = createObject('Squirrel', {
  name: 'Alice',
  color: 'Grey'
}, tree.id)

const squirrel3 = createObject('Squirrel', {
  name: 'Chuck',
  color: 'Black'
}, tree.id)

const acorn1 = createObject('Acorn', {
  name: 'Golden Acorn',
  taste: 'Sweet and Crunchy'
}, squirrel1.id)

const acorn2 = createObject('Acorn', {
  name: 'Mighty Acorn',
  taste: 'Smooth and Nutty'
}, squirrel1.id)

const acorn3 = createObject('Acorn', {
  name: 'Ancient Acorn',
  taste: 'Moldy and Bitter'
}, squirrel2.id)

const acorn4 = createObject('Acorn', {
  name: 'Lucky Acorn',
  taste: 'Rich and Buttery'
}, squirrel2.id)

const acorn5 = createObject('Acorn', {
  name: 'Invisible Acorn',
  taste: 'Mysteriously Flavorless'
}, squirrel3.id)

const acorn6 = createObject('Acorn', {
  name: 'Quantum Acorn',
  taste: 'Tastes different each time!'
}, squirrel3.id)

const squirrel4 = createObject('Squirrel', {
  name: 'Eve',
  color: 'Brown'
}, tree.id)

const squirrel5 = createObject('Squirrel', {
  name: 'Frank',
  color: 'Red'
}, tree.id)

const nest1 = createObject('Nest', {
  name: 'Soft Nest',
  comfort: 'Very Comfy'
}, tree.id)

const nest2 = createObject('Nest', {
  name: 'High Nest',
  comfort: 'Great View, Less Comfort'
}, tree.id)

const bird1 = createObject('Bird', {
  name: 'Chirpy',
  color: 'Yellow'
}, nest1.id)

const bird2 = createObject('Bird', {
  name: 'Feather',
  color: 'Blue'
}, nest2.id)

const acorn7 = createObject('Acorn', {
  name: 'Musical Acorn',
  taste: 'Sings when you bite!'
}, squirrel4.id)

const acorn8 = createObject('Acorn', {
  name: 'Spicy Acorn',
  taste: 'Hotter than a chili pepper'
}, squirrel5.id)

const surprise1 = createObject('Surprise', {
  name: 'Mysterious Map',
  detail: 'A map to hidden treasure!',
}, bird1.id)

const surprise2 = createObject('Surprise' as const, {
  name: 'Shiny Key',
  detail: 'A key to an unknown lock...',
}, bird2.id)

export const objects = [
  tree,
  squirrel1, squirrel2, squirrel3, squirrel4, squirrel5,
  acorn1, acorn2, acorn3, acorn4, acorn5, acorn6, acorn7, acorn8,
  nest1, nest2,
  bird1, bird2,
  surprise1, surprise2
].sort(() => Math.random() - 0.5);
