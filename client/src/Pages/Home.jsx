import React,{ useState, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "axios"

const Home = () => {

    const [posts, setPosts] = useState( [] )

    const cat = useLocation().search
    //console.log(cat)

    useEffect(() => {
        const fetchData = async () =>{
            
            try{
                
                const res = await axios.get(`http://localhost:8800/api/posts${cat}`)
                //console.log(res.data)
                setPosts(res.data);

            }catch(err){
                console.log(err)
            }
        };
        fetchData();
    }, [cat]);

    // const posts=[
    //     {
    //         id:1,
    //         title:"Car",
    //         desc:"Car is good",
    //         img:"https://images.barrons.com/im-527268?width=700&size=1.5440289505428226&pixel_ratio=1.5"
    //     },
    //     {
    //         id:2,
    //         title:"Bike",
    //         desc:"Bike is good",
    //         img:"https://akm-img-a-in.tosshub.com/indiatoday/images/story/202103/03_The_all-new_BMW_M_1000_RR_1200x768.jpeg?size=690:388"
    //     },
    // ];



    // const getText = (html) => {
    //     const doc = new DOMparser().parseFormString(html, "text/html")
    //     return doc.body.textContent
    // }
    //`../upload/{post.img}`

    return (
        <div className="home">
            <div className="posts">
                {posts.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={post.img} alt=""/> 
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}>
                            <h1>{post.title}</h1>
                            </Link>
                            <p>{post.descript}</p>
                            <button>Read More</button>
                        </div>
                        
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Home