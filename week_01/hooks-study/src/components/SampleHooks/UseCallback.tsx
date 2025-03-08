import React, { Children, memo, useCallback, useState } from 'react'
import { Button } from 'antd'

const MainView = () => {
  const [num, setNum] = useState(0)
  const [status, setStatus] = useState(true)

  const increment = useCallback(() => {
    setNum(num + 1)
  }, [num])

  return (
    <>
      <CustomButton onClick={() => setNum(num + 1)}>普通按钮</CustomButton>
      <CustomButton onClick={increment}>useCallback按钮</CustomButton>
      <div>数值: {num}</div>
      <Button type="primary" onClick={() => setStatus(!status)}>
        切换状态 {status ? '开' : '关'}
      </Button>
    </>
  )
}

const CustomButton = memo(({
  children,
  onClick = () => {},
}: {
  children?: React.ReactNode,
  onClick?: () => void,
}) => {
  console.log(children)
  return (
    <Button type="primary" onClick={onClick}
    style={children === 'useCallback按钮' ? { marginLeft: 10 } : {}}
    >
      {children}  
    </Button>
  )
})

export default MainView
