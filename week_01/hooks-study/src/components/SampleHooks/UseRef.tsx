import { useState, useRef } from 'react';


const MainView = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [viewportHeight, setViewportHeight] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const { clientHeight, scrollHeight, scrollTop } = containerRef.current;
      setViewportHeight(clientHeight);
      setCurrentScroll(scrollTop);
      setTotalHeight(scrollHeight);
    }
  }

  return (
    <>
      <div>
        <p>视窗高度：{viewportHeight}</p>
        <p>以滚动高度：{currentScroll}</p>
        <p>内容整体高度：{totalHeight}</p>
      </div>
      <div
        style={{
          width: 800,
          height: 250,
          border: '2px dashed #666',
          overflowY: 'auto',
          background: '#f9f9f9',
          marginTop: 20,
        }}
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div style={{ height: 2200 }}></div>
      </div>
    </>
  )
}

export default MainView
