import { useRef, useState } from "react";
import uploadFile from "../services/apiCalls";

const UploadDoc = ({ updateFiles }) => {
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState('');
    const [addLoading, setAddLoading] = useState(false);
    const fileInputRef = useRef();

    function onAddClick() {
        fileInputRef.current.click();
    }
    function onRemoveClick() {
        fileInputRef.current.value = ""
        setFile('')
    }

    async function onUploadClick(e) {
        e.preventDefault();
        if (file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("desc", desc)
            data.append("file", file)

            const newFile = await uploadFile({ data, setAddLoading })

            updateFiles((prevFiles) => [...prevFiles, newFile]);

            fileInputRef.current.value = "";
            setFile('');
            setDesc('');
        } else {
            alert('Please add file')
        }
    }

    return (
        <div className="ShareDocWrapper text-center">
            <h1 className="px-4 py-2 text-3xl font-semibold text-[#445A6F]">Simple file sharing with ShareDocs</h1>
            <p className="text-sm text-gray-400">Upload and share the download link</p>

            <div className="flex flex-col py-5 space-y-2 mx-auto w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%]">
                <span
                    className="FileIcon mx-auto p-2 hover:bg-[#f0f2f2] rounded-full cursor-pointer"
                >
                    {!fileInputRef?.current?.value ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12" onClick={() => onAddClick()}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12" onClick={() => onRemoveClick()}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    }
                </span>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept=".xlsx, .docx, .pdf"
                    className="FileInput hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <h5>{fileInputRef?.current?.value}</h5>
                <form onSubmit={onUploadClick} className="flex flex-col space-y-1">
                    <input className="DescriptionInput border border-zinc-700 py-1 px-2 rounded-lg relative" type="text" placeholder="description" required value={desc} onChange={e => setDesc(e.target.value)} />
                    <button className="UploadButton px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xl transition delay-125 duration-150 ease-in-out" disabled={addLoading}>Upload</button>
                </form>
            </div>
        </div>
    )
}

export default UploadDoc;