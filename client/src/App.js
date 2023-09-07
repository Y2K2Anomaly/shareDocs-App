import UploadDoc from "./components/UploadDoc";
import DocLists from "./components/DocLists";
import { useRef, useState } from "react";

const App = () => {

  const [files, setFiles] = useState([]);
  const scrollRef = useRef();

  const updateFiles = (newFile) => {
    setFiles(newFile);
  };

  return (
    <div className="App h-[100vh]">

      <UploadDoc updateFiles={updateFiles} />
      <span className="block h-[1px] bg-gray-300 shadow-2xl" />
      <DocLists files={files} setFiles={setFiles} scrollRef={scrollRef} />
    </div >
  );
}

export default App;
