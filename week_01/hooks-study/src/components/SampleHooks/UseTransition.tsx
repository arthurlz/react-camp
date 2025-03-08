import { useState, useEffect, useTransition, useCallback } from 'react';
import { Input, Spin, Space, List, Typography } from 'antd';

const { Title, Text } = Typography;

function heavyCompute(inputValue: string) {
  console.log('heavyCompute start');
  const result =[]
  for (let i = 0; i < 20000; i++) {
    result.push(`${inputValue} - 结果: ${i}`)
  }
  return result
}

function Example() {
  const [text, setText] = useState('')
  const [filteredData, setFilteredData] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setText(inputValue)
    
    startTransition(() => {
      setFilteredData(heavyCompute(inputValue))
    });
  }, [startTransition])



  return (
    <div style={{ padding: 24, maxWidth: 600, margin: 'auto' }}>
      <Title level={3}>useTransition 示例</Title>
      
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          value={text}
          onChange={handleChange}
          placeholder='输入内容进行计算'
          size='large'
          allowClear
        />
        {
          isPending ? (
            <Space align='center'>
              <Spin />
              <Text>计算中...</Text>
            </Space>
          ) : (
            <List
              size='small'
              dataSource={filteredData}
              style={{ height: 300, overflow: 'auto' }}
              renderItem={(item) => (
                <List.Item>
                  {item}
                </List.Item>
              )}
            />
          )
        }

        </Space>
    </div>
  )
}

export default Example;
