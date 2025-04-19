import {photos} from '../../../data';

/*
(.)匹配同一层级别
(..)匹配上一层
(..)(..)匹配上上层
(...)匹配根目录
*/

/* 同一个路由地址却展示了不同的内容，这就是拦截路由的效果， 
  在 dribbble.com想访问 dribbble.com/shots/25914452-Cruising-for-the-coast， 此时会拦截dribbble.com/shots/25914452-Cruising-for-the-coast这个路由
  以Modal的形式展现，如果直接访问dribbble.com/shots/25914452-Cruising-for-the-coast这个路由，则是展示原本的UI
*/

export default async function PhotoModal({ params }: {
  params: Promise<{id: string}>
}) {
  const { id }  = await params
  const photo = photos.find((p) => p.id === id)
  return (
    <div className="modal">
      <img style={{width: '200', position: 'fixed', top: '120px'}} src={photo?.src} />
    </div>
  )
}
