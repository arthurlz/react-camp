import { atom, Provider, useAtomValue, useSetAtom,  } from 'jotai'
import { focusAtom } from 'jotai-optics'

const anAtom = atom({
  count: 1,
  text: 'jotai'
})

const textAtom = focusAtom(anAtom, (optic) => optic.prop('text'))

function Display() {
  // get Atom
  const text = useAtomValue(textAtom)
  console.log(text)
  return <div>Display: {text}</div>
}

function Control() {
  // set Atom
  const setPrice = useSetAtom(anAtom)
  const { count } = useAtomValue(anAtom)
  return (
    <div>
      <h3>{count}</h3>
      <button onClick={() => setPrice((value) => ({
        ...value,
        count: value.count + 1
      }))}>set price</button>
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