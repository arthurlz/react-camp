
import { styled, createGlobalStyle } from "styled-components";

const ColoredText = styled.div`
  && {
    color: skyblue;
  }

  &:hover {
    color: purple;
  }

  &::before {
    content: '🏜️!'
  }

  &.text1 + & {
    background-color: darkblue;
  }

  &.text2 ~ & {
    background-color: pink;
  }
`

const GlobalCss = createGlobalStyle`
  ${ColoredText} {
    color: red;
  }
`


function App4() {
  return <>
    <GlobalCss />
    <ColoredText>Hello styled components</ColoredText>
    <ColoredText className='text1'>Hello styled components</ColoredText>
    <ColoredText>Hello styled components</ColoredText>
    <ColoredText className="text2">Hello styled components</ColoredText>
    <ColoredText>Hello styled components</ColoredText>
    <ColoredText>Hello styled components</ColoredText>
    <ColoredText>Hello styled components</ColoredText>
  </>
}

export default App4;
