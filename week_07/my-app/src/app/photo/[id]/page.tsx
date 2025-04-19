import {photos} from '../../data';

export default async function PhotoPage({ params }: {
  params: Promise<{id: string}>
}) {
  const { id }  = await params
  console.log(id)
  const photo = photos.find((p) => p.id === id)
  return (
    <img style={{width: '50%', display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src={photo?.src} />
  )
}