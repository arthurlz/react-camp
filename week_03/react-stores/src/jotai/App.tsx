import { atom, Provider, useAtomValue, useSetAtom } from 'jotai'

const countAtom = atom(1)
const derivedAtom = atom((get) => get(countAtom) * 2)
const derivedAtom2 = atom((get) => get(derivedAtom) * 3)


function Display() {
  // get Atom
  const count = useAtomValue(derivedAtom2)
  return <div>Display: {count}</div>
}

function Control() {
  const setCount = useSetAtom(countAtom)

  return (
    <div>
      <button onClick={() => setCount((value) => value + 1)}>set count</button>
    </div>
  )
}


export default function App() {
  return (
    <Provider>
      <Display />
      <Control />
    </Provider>
  )
}