import { useState, useEffect, useDeferredValue, useTransition, useCallback } from 'react';
import { Input, Spin, Space, List, Card, Typography } from 'antd';

const { Title, Text } = Typography;


const generateList = (key: string) => { 
  const result = []
  for (let i = 0; i < 20000; i++) {
    if (String(i).includes(key)) {
      result.push({ id: i, text: i })
    }
  }
  return result
}

const SearchComponent = () => {
  const [searchText, setSearchText] = useState('')

  const delayedSearch = useDeferredValue(searchText)

  console.log('🟦 searchText:', searchText)
  console.log('🟨 delayedSearch:', delayedSearch)

  return (
    <Card style={{ width: 600, margin: 'auto', padding: 20 }}>
      <Title level={3}>useDeferredValue 示例</Title>

      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder='请输入数字'
          size='large'
          allowClear
        />
        <List
          size='small'
          bordered
          style={{ height: 300, overflow: 'auto' }}
          dataSource={delayedSearch ? generateList(delayedSearch) : []}
          renderItem={(item) => (
            <List.Item key={item.id}>
              {item.text}
            </List.Item>
          )}
        />
      </Space>
    </Card>
  )
}

export default SearchComponent;
