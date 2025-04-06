import { Router } from "express";
import { getAlluser,
        getSingleUser,
        createUser} from '../controlllers/users'

const router = Router()

router.get('/', getAlluser)
router.get('/:id', getSingleUser)
router.post('/', createUser)

export default router;