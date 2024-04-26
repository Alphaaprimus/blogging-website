import express from "express";
import {register, login, logout} from "../controllers/auth.js"
import cors from "cors"

const app = express()
app.use(cors());
const router = express.Router()


router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)

export default router;