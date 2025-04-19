import Link from 'next/link'
// useRouter hook 客户端组件
// redirect 函数 （服务端组件) 

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
