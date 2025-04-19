// shops/ 也会被匹配

export default async function Page({ params }: any) {
  const _params = await params
  return <div>My Shops: {JSON.stringify(_params)}</div>
}
