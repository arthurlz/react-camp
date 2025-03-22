import { atom, Provider, useAtomValue, useSetAtom, useStore } from 'jotai'

const priceAtom = atom(0)

function Display() {
  // get Atom
  const price = useAtomValue(priceAtom)
  return <div>Display: {price}</div>
}

function Control() {
  // set Atom
  const setPrice = useSetAtom(priceAtom)
  const store = useStore()
  const price = store.get(priceAtom)

  // get set atom
  // const [price2, setPrice2] = useAtom(priceAtom)

  return (
    <div>
      <div>Control: {price}</div>
      <button className='mr-5' onClick={() => store.set(priceAtom, price + 1)}>set price 1</button>
      <button onClick={() => setPrice((value) => value + 1)}>set price 2</button>
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