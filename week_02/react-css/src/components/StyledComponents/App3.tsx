import { FC, PropsWithChildren } from "react"
import styled from "styled-components";

interface LinkProps extends PropsWithChildren {
  href: string;
  className?: string;
}

const Link: FC<LinkProps> = (props) => {
  const {
    href,
    className,
    children
  } = props
  return <a href={href} className={className}>{children}</a>
}

const StyledLink = styled(Link).attrs<{ $color?: string }>(props => {
  console.log(props);

  props.$color = 'red'
  props.children = props.children + '⭐test'
  return props;
})`
  color: ${props => props.$color || 'green'};
  font-size: 24px;
`



function App2() {
  return (
    <div>
      <StyledLink $color='purple' href='#test'>test link</StyledLink>
    </div>
  )
}

export default App2
