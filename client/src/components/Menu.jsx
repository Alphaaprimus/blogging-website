import React,{ useState , useEffect} from "react";
import axios from "axios";

const Menu = ({cat}) => {

    const [posts, setPosts] = useState( [] )

    useEffect(() => {
        const fetchData = async () =>{
            try{
                //console.log(cat)
                const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`);
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


    return(
    <div className="menu">
        <h1>Other post you may like</h1>
        {posts.map(post => (
            <div className="post" key={post.id}>
                <img src={post.img} alt=""/>
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
    )
}

export default Menu;