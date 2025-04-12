import classnames from 'classnames'
import reactLogo from '../../assets/react.svg'
import { usePlaygroundStore } from '../../store/ReactPlaygroundStore'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'

export default function Header() {
  const theme = usePlaygroundStore.use.theme()
  const setTheme = usePlaygroundStore.use.setTheme()

  return (
    <div className={classnames(
      'h-[50px] px-[20px] box-border border-b flex items-center justify-between',
      theme === 'light'
        ? 'bg-white text-black border-b-[#e0e0e0]'
        : 'bg-[#1e1e1e] text-white border-b-[#333]'
    )}>
      <div className='flex items-center text-[20px]'>
        <img src={reactLogo} className="h-[20px] mr-[10px]" alt="React logo" />
        <span className='ml-[8px]'>React Playground</span>
      </div>
      <div>
        {theme === 'light' && (
          <MoonOutlined
            title='切换暗色'
            onClick={() => setTheme('dark')}
          />
        )}
        {theme === 'dark' && (
          <SunOutlined
            title='切换亮色'
            onClick={() => setTheme('light')}
          />
        )}
      </div>
    </div>
  )
}
