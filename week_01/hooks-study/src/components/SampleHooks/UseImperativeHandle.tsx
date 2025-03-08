import { ForwardRefRenderFunction, forwardRef, useEffect, useRef } from "react";


// const TextInput: ForwardRefRenderFunction<HTMLInputElement> = (props, ref) => {
//   return (
//     <div>
//       <input ref={ref} placeholder="请输入内容" />
//     </div>
//   )
// }

// const ForwardedTextInput = forwardRef(TextInput);


// react 19.0.0
const  TextInput = (props: React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>) => {
  return <input {...props} />;
}

export default function MainComponentHandle() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="App">
      <TextInput ref={inputRef} />
    </div>
  )
}


