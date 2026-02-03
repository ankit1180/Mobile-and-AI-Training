import { useState, useEffect, useRef } from "react";
import axios from "axios";

function FileUploader() {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const uploadFile = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Select a file first");
            return;
        }

        console.log(file);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post(`http://localhost:8080/upload/${encodeURIComponent(file.size)}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percent);
                },
            });


            alert("Upload Successful");
            setFile(null);
            setProgress(0);
            if (fileInputRef.current) fileInputRef.current.value = "";
            fetchFiles();
            console.log('Fetch File Called');

        } catch (err) {
            alert(err.response?.data?.message || "Upload failed");
            setProgress(0);
        }
    };

    const fetchFiles = async () => {
        try {
            const res = await axios.get("http://localhost:8080/getAllFiles");
            setData(res.data);
        } catch (err) {
            console.error("Fetch error:", err.message);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);


    const handleDragOver = (e) => e.preventDefault();
    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) setFile(droppedFile);
    };

    const deleteFile = async (fileObj) => {
        try {
            await axios.delete(`http://localhost:8080/delete/${encodeURIComponent(fileObj.public_id)}`);
            setData(prev => prev.filter(item => item.public_id !== fileObj.public_id));
            alert("File deleted");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="w-96 bg-[#9a7850] rounded p-5 text-white shadow-xl">
                <h1 className="text-center text-xl font-semibold">File Uploader</h1>

                <form className="space-y-4 mt-5" onSubmit={uploadFile}>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />


                    <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current.click()}
                        className="border-2 border-dashed border-black p-6 text-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        {file ? (
                            <p className="text-sm text-green-700 font-medium">Selected: {file.name}</p>
                        ) : (
                            <p className="text-sm text-blue-600">
                                Drag & drop a file here or click to upload
                            </p>
                        )}
                    </div>

                    <button type="submit" className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition-all">
                        Upload
                    </button>
                </form>


                {progress > 0 && (
                    <div className="w-full bg-gray-300 rounded-full mt-4 h-4 overflow-hidden">
                        <div
                            className="bg-green-600 h-full text-[10px] flex items-center justify-center transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        >
                            {progress}%
                        </div>
                    </div>
                )}


                <div className="mt-5 space-y-2">
                    <h2 className="text-lg font-bold border-b border-white/20 pb-1">
                        {data.length > 0 ? "Uploaded Files" : "No Files Found"}
                    </h2>
                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                        {data.map((item, index) => (
                            <div key={item.public_id || index} className="bg-white text-black p-2 rounded flex justify-between items-center shadow-sm">
                                <span className="text-xs truncate w-32 font-medium">{item.name || 'Unnamed file'}</span>
                                <div className="flex gap-2">
                                    <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-600 text-xs underline">View</a>
                                    <button
                                        onClick={() => deleteFile(item)}
                                        className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileUploader;