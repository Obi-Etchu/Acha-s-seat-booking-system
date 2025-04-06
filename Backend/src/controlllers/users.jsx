import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const getAlluser = async (req, res)=>{
    try{
const users =  await prisma.customer.findMany()
res.status(200).json(users)
    }catch(err){
        res.status(500).json({msg: 'failed to load details'})
    }
};

export const getSingleUser = async(req, res)=>{
const {id} = req.params;
try{
const users = await prisma.customer.findUnique({where: { id: Number(id)}})
if (!users) return res.status(404).json({ error: 'User not found' });
res.status(200).json(users)
}catch(err){
      res.status(500).json({msg: 'No user was found'})
    }
}

export const createUser = async (req, res) => {
    const { name, email, phone } = req.body;
  
    const exist = await prisma.customer.findUnique({where:{email}})
    if (exist) {
        return res.status(400).json({ msg: 'Email already exists! choose a different email' });
      }
    if (!name || !email || !phone) {
      return res.status(400).json({ msg: 'Name and email are required' });
    }
  
    try {
      const newUsers = await prisma.customer.create({
        data: { email, name },
      });
      res.status(200).json(newUsers);
    } catch (err) {
      console.log(err); 
      res.status(500).json({ msg: 'Failed to create user', error: err.message });
    }
  };
