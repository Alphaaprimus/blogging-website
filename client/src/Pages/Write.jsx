import React,{useState, useRef, useMemo} from "react";
import JoditEditor from 'jodit-react';
import axios from "axios"
import { useLocation } from "react-router-dom";
import moment from "moment";



const Write = () => {
    const editor =useRef(null)
    const state = useLocation().state
    const [content, setContent] = useState(state?.descript || "")
    const [title, setTitle] = useState(state?.title || "")
    const [cat, setCat] = useState(state?.cat || "")
    const [file, setFile] = useState(null)


    const upload = async ()=>{
        try{
            const formData  = new FormData();
            formData.append("file",file)
            const res  = await axios.post("http://localhost:8800/api/upload", formData)
            return res.data

        }catch(err){
            console.log(err)

        }
    }

    const handleClick = async e=>{
        e.preventDefault()
        
        const imgUrl = await upload()

        try{
            state ? await axios.put(`http://localhost:8800/api /posts/${state.id}`,{
                title,
                descript,
                cat,
                img:file ? imgUrl : ""
            },{ withCredentials: true }) : await axios.post(`http://localhost:8800/api /posts/`,{
                title,
                descript,
                cat,
                img:file ? imgUrl : "",
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")

        },{ withCredentials: true })
    }catch(err){
            console.log(err)

        }

    }

    
    return (
        
        <div className="add">
            <div className="content">
                <input type="text" value={title} placeholder="Title" onChange={e=>setTitle(e.target.value)}/>
                <div className="editorContainer">
                <JoditEditor
                ref={editor}
                value={content}
                onChange={newContent => setContent(newContent) }/>
                
            </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status:</b> Draft
                    </span>
                    <span>
                        <b>Visibility:</b> Public
                    </span>
                    <input style={{display:"none"}}type="file" name=""id="file" onChange={e=>setFile(e.target.files[0])}/>
                    <label className="file" htmlFor="file">Upload Image</label>
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">

                    <input type="radio" checked={cat === "art"} name="cat" value="art" id="art" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="art">Art</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "design"} name="cat" value="design" id="design" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="design">Design</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "technology"} name="cat" value="technology" id="technology" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "infrastructure"} name="cat" value="infrastructure" id="infrastructure" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="infrastructure">Infrastructure</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={cat === "cars"} name="cat" value="cars" id="cars" onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="cars">Cars</label>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Write 