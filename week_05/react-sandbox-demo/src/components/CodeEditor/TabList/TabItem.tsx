import classnames from "classnames";
import React, { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";

export type TabItemProps = {
  value: string;
  activated: boolean;
  creating: boolean;
  readonly: boolean;
  onClick: () => void;
  onEditComplete: (name: string) => void;
  onRemove: MouseEventHandler;
};

export const TabItem: React.FC<TabItemProps> = (props) => {
  const {
    value,
    activated = false,
    creating,
    readonly,
    onClick,
    onEditComplete,
    onRemove,
  } = props;

  const [name, setName] = useState(value);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onDoubleClick = useCallback(() => {
    if (readonly) {
      return
    }
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }, [readonly])

  const onInputBlur = useCallback(() => {
    setEditing(false);
    onEditComplete(name);
  }, [name, onEditComplete])

  useEffect(() => {
    if(creating) {
      inputRef.current?.focus();
    }
  }, [creating])

  return (
    <div
      className={classnames(
        'inline-flex items-center cursor-pointer border-b-[3px] border-transparent px-3 py-2 text-sm leading-5',
        activated && 'text-sky-500 border-b-sky-500',
      )}
      onClick={onClick}
    >
      {
        editing ? (
          <input
            ref={inputRef}
            className="
              w-[90px]
              py-1 pl-[10px] pr-2
              text-sm
              bg-gray-300 border border-gray-300 rounded
              outline-none
              focus:outline-none
            "
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={onInputBlur}
          />
        ) : (
          <>
            <span onDoubleClick={onDoubleClick}>{name}</span>
            {
              !readonly ? (
                <span onClick={e => {
                  e.stopPropagation();
                  onRemove(e)
                }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                  >
                    <line stroke='#999' x1='18' y1='6' x2='6' y2='18' strokeWidth='2' />
                    <line stroke='#999' x1='6' y1='6' x2='18' y2='18' strokeWidth='2' />
                  </svg>
                </span>
              ) : null
            }
          </>
        )
      }
    </div>
  );
};
