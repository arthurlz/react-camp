// [slug] 只会匹配一层

// [...slug] 匹配所有的路由片段 //shop/a/c shop/c/d shop/a/b/c 
// 都会匹配

// [[...slug]] shops/ 也会被匹配

export default async function Page({ params }: any) {
  const _params = await params
  return <div>My Shop: {JSON.stringify(_params)}</div>
}
