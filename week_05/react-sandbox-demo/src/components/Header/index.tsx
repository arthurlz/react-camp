import reactLogo from '../../assets/react.svg'

export default function Header() {
  return (
    <div className='h-[50px] px-[20px] box-border border-b border-[#e0e0e0] flex items-center justify-between'>
      <div className='flex items-center text-[20px]'>
        <img src={reactLogo} className="h-[20px] mr-[10px]" alt="React logo" />
        <span className='ml-[8px]'>React Playground</span>
      </div>
    </div>
  )
}
