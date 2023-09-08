import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CircularProgress, IconButton } from '@mui/material';
import { ContentPaste, Download, FileCopy } from '@mui/icons-material';

const DocLists = ({ files, setFiles, scrollRef }) => {
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [copyFileId, setCopyFileId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function getAllFiles() {
            try {
                setLoading(true);
                const { data } = await axios.get('/files');
                setFiles(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching files:', error);
                setError(error.message);
            }
        }

        getAllFiles();
    }, [setFiles]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [files, scrollRef])

    useEffect(() => {
        const filteredList = files?.filter((file) =>
            file?.name?.toLowerCase().includes(searchInput?.toLowerCase()) ||
            file?.desc?.toLowerCase().includes(searchInput?.toLowerCase())
        );
        setFilteredFiles(filteredList);
    }, [searchInput, files])

    function highlightKeywords(text, keywords) {
        if (!keywords || keywords?.length === 0) {
            return text;
        }

        const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
        return text?.replace(regex, '<span class="highlighted">$1</span>');
    }

    function handleDownloadClick(downloadlink) {
        if (downloadlink) {
            window.open(downloadlink, '_blank');
        } else {
            console.error('Download link not available');
        }
    };

    const File = ({ file }) => {
        const highlightedName = highlightKeywords(file?.name, [searchInput]);
        const highlightedDesc = highlightKeywords(file?.desc, [searchInput]);

        function handleCopyClick() {
            if (file?.downloadlink) {
                navigator.clipboard.writeText(file.downloadlink)
                    .then(() => {
                        alert('Download link copied to clipboard!');
                    })
                    .catch((error) => {
                        console.error('Copy to clipboard failed:', error);
                    });
                setCopyFileId(file?._id);

                setTimeout(() => {
                    setCopyFileId(null);
                }, 700);
            } else {
                console.error('Download link not available');
            }
        };

        return (
            <tr className="border-t" ref={scrollRef}>
                <div className='flex items-center'>
                    <IconButton onClick={() => handleDownloadClick(file?.downloadlink)}>
                        <Download color='primary' />
                    </IconButton>
                    {!copyFileId ?
                        <IconButton onClick={handleCopyClick}>
                            <FileCopy color='primary' />
                        </IconButton>
                        : <IconButton onClick={handleCopyClick}>
                            {copyFileId === file._id ? <ContentPaste color='primary' /> : <FileCopy color='primary' />}
                        </IconButton>
                    }
                    <td className="py-2 px-4" dangerouslySetInnerHTML={{ __html: highlightedName }}></td>
                </div>
                <td className="py-2 px-4 hidden md:table-cell" dangerouslySetInnerHTML={{ __html: highlightedDesc }}></td>
            </tr>
        )
    }


    return (

        loading ?
            <div className='absolute top-[60%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                {!error ? (
                    <div className='flex flex-col justify-center items-center'>
                        < CircularProgress />
                        Loading...
                    </div>) : error
                }
            </div > :

            <div className='DocListWrapper bg-white shadow h-96 w-[98%] mx-auto mt-6 ring ring-gray-300 ring-opacity-50 overflow-y-hidden'>
                <div className='flex justify-between items-center px-2 py-1'>
                    <h1 className='text-lg font-semibold'>counts: {!searchInput ? files?.length : filteredFiles.length}</h1>
                    <input
                        type="text"
                        className='SearchInput border h-[32px] w-40 sm:w-52 border-b-gray-500 text-lg px-1 py-1 outline-none mr-2'
                        placeholder="Search any file"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
                <hr />
                <div className="DocumentList px-2 max-h-80 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    <table className="w-full">
                        <thead className="bg-gray-200 text-left sticky top-0 z-10">
                            <tr>
                                <th className="py-2 px-24">Document Name</th>
                                <th className="py-2 px-4 hidden md:table-cell">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!searchInput ? (
                                files?.map((file, index) => <File file={file} key={index} />)
                            ) : (
                                filteredFiles?.map((file, index) => <File file={file} key={index} />)
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
    );
};

export default DocLists;
