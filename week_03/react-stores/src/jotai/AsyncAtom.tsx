
import { atom, Provider, useAtomValue, useAtom, useSetAtom } from 'jotai'
import { Suspense } from 'react'
import { Spin } from 'antd'

// async read atom
const asyncAtom = atom(async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('xxxxx')
    }, 2000)
  })
})

// async write atom
const countAtom = atom(1)
const request = async () => new Promise((r) => setTimeout(r, 2000, 10))


// function Display() {
//   // get Atom
//   const value = useAtomValue(asyncAtom)
//   return <div>Display: {value}</div>
// }

function Display() {
  const [value, add] = useAtom(countAtom)
  return <div onClick={() => add(request)}>Display: {value}</div>
}


export default function App() {
  return (
    <Suspense fallback={<Spin>loading...</Spin>}>
      <Display />
    </Suspense>
  )
}