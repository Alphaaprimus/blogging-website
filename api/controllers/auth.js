import {db} from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const register = (req,res) =>{


    //CHECK EXISTING USER
     
    
    console.log(req.body.email)
    const q = "SELECT * FROM users WHERE email = $1 OR username = $2"
    
    db.query(q,[req.body.email, req.body.username], (err,data) => {
        //console.log(rows)
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists");

        //HASHING PASSWORD

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q ="INSERT INTO users (username,email,password) VALUES ($1,$2,$3)"

        //console.log(q)
        
        const values =[
            req.body.username,
            req.body.email,
            hash,
        ]
        //console.log(values)

        db.query(q,values, (err,data) =>{
            //console.log(err)
            if (err) return res.json(err);
            return res.status(200).json("user has been created");
        })
        
    });
    
};

export const login= (req,res) =>{

    

    //CHECK USER
    

    const q = "SELECT * FROM users WHERE username = $1"


    

    db.query(q,[req.body.username], (err,data) =>{
         //console.log(data)

        if (err) return res.json(err);
       if(data.rowCount === 0 ) return  res.status(404).json("User not found!"); 
       
       

       //CHECK PASSWORD
       const isPasswordCorrect = bcrypt.compareSync(req.body.password, data.rows[0]?.password); 

       if(!isPasswordCorrect) return res.status(400).json("Wrong username and password")
  
       const token = jwt.sign({id:data.rows[0]?.id},"jwtkey");
    //    console.log("this is token")
        //console.log(token)
       const {password, ...other} = data.rows[0] 
       //console.log(data.rows[0])

       
       //const oneDayInSeconds = 24 * 60 * 60;

       res.cookie("access_token", token,{
        //maxAge: oneDayInSeconds,
        httpOnly: true,

       }).status(200).json(other)
       
       


    });

};

export const logout = (req,res) =>{
    console.log("inside logout")

    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")
    

}


