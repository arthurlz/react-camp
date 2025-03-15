import styled from "styled-components";

const Title = styled.h1<{ color?: string }>`
  font-size: 30px;
  text-align: center;
  color: ${props => props.color || 'blue'};
`

const Header = styled.div`
  padding: 24px;
  background-color: #d3bd50;
`

const Button = styled.button<{color?: string}>`
  font-size: 20px;
  margin: 8px 16px;
  border: 2px solid #ef1234;
  color: ${props => props.color || 'skyblue'}
`

const ButtonWrapper = styled(Button)`
  border-radius: 6px;
`



function App1() {
  return (
    <>
      <Header>
        <Title> Hello styled components</Title>
        <Title color="red">Vite + React</Title>
        <Title color="green">Vite + React</Title>
        <ButtonWrapper color='purple' as='div'>button wrapper</ButtonWrapper>
      </Header>
    </>
  )
} 
export default App1;
