import { styled, keyframes, css, RuleSet } from 'styled-components'

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0);
  }
`

const animation = css<{ $duration: number }>`
  animation: ${bounce} ${props => props.$duration}s ease-in-out infinite;
`

const BouncyBox = styled.div<{ $duration: number; otherStyles: RuleSet }>`
  display: inline-box;
  ${animation}
  font-size: 24px;
  padding: 24px;
  transition: 0.3s;

  ${props => props.otherStyles}
`

function App5() {
  return (
    <div>
      <BouncyBox
        $duration={2}
        otherStyles={[
          {
            backgroundColor: 'skyblue', borderRadius: '12px'
          },
          {
            boxShadow: '0 0 4px blue'
          }
        ]}
      >
        Bouncy!🕺
      </BouncyBox>
    </div>
  )
}

export default App5
