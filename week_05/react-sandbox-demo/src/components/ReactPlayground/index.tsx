import { Allotment } from "allotment";
import "allotment/dist/style.css";
import CodeEditor from "../CodeEditor";
import Preview from "../Preview";
import Header from "../Header";


export default function ReactPlayground() {
  return (
    <div className="h-screen">
      <Header />
      {/* 
        The Allotment component is used to create a layout with resizable panes.
        The defaultSizes prop sets the initial sizes of the panes.
        The minSize prop sets the minimum size of each pane.
      */}
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={500}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}