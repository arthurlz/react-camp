import classnames from "classnames";
import React, { useEffect, useState} from 'react';

export type MessageProps = {
  type: 'error' | 'warn' 
  content?: string;
}

const colorMap = {
  error: {
    text: 'text-red-500',
    border: 'border-red-500',
    bg: 'bg-red-50',
    dismiss: 'bg-red-500 text-red-50'
  },
  warn: {
    text: 'text-yellow-500',
    border: 'border-yellow-500',
    bg: 'bg-yellow-50',
    dismiss: 'bg-yellow-500 text-yellow-50'
  }
}

export const Message: React.FC<MessageProps> = (props) => {
  const { type, content } = props;
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    setVisible(!!content)
  }, [content])

  const style = colorMap[type]

  return visible ? (
    <div
      className={classnames(
        'absolute right-2 left-2 bottom-12 z-10',
        'flex items-stretch mb-2',
        'border-2 rounded-md',
        'max-h-[calc(100%-300px)] min-h-[40px]',
        style.text,
        style.border,
        style.bg
      )}
    >
      <pre className="m-0 p-3 whitespace-break-spaces overflow-auto">{content}</pre>
      <button
        className={classnames(
          'absolute top-0.5 right-0.5 w-[18px] h-[18px] text-[9px] leading-[18px] text-center cursor-pointer border-none rounded-full',
          style.dismiss
        )}
        onClick={() => setVisible(false)}
      >
        x
      </button>
    </div>
  ) : null
}