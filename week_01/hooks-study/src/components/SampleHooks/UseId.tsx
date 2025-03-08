import { useId, useState } from 'react';
import { Form, Input, Typography } from 'antd';
const { Title } = Typography;


export default function Example() {
  const usernameid = useId();
  const emailId = useId();

  const [formdata, setformdata] = useState({
    username: '',
    email: ''
  })

  return (
    <div style={{ padding: 24, maxWidth: 360, margin: 'auto' }}>
      <Title level={3}>useId 示例</Title>
      <Form layout='vertical'>
        <Form.Item label={<label htmlFor={usernameid}>用户名</label>}>
          <Input
            id={usernameid}
            value={formdata.username}
            onChange={(e) => setformdata({ ...formdata, username: e.target.value })}
            placeholder='请输入用户名'
          />
        </Form.Item>
        <Form.Item label={<label htmlFor={emailId}>邮箱</label>}>
          <Input
            id={emailId}
            value={formdata.email}
            onChange={(e) => setformdata({ ...formdata, email: e.target.value })}
            placeholder='请输入邮箱'
          />
        </Form.Item>
      </Form>
    </div>
  )
}
