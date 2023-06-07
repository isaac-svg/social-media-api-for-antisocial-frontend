import express from "express"
import {getUser,addRemoveFriend,getUserFriends} from '../controllers/user.js'
import { verifyToken } from "../middleware/auth.js"


const router =  express.Router()

/*READ */
router.get("/:id",verifyToken,getUser)
router.get("/:id/friends",verifyToken,getUserFriends)

/*UPDATE */
router.patch(":/id/:friendId",addRemoveFriend)

export default router