const express = require('express');
const prisma = require('../prisma/client');
const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await prisma.user.create({
            data: {
                name,
                email,
                posts: {
                    create: {
                        title: "My first post",
                        description: "This is the description of my first post when user is created",
                        comments: {
                            create: {
                                comment: "This is the first comment",
                                author: {
                                    connect: { email } // link the comment to the same user
                                }
                            }
                        }
                    }
                }
            },
            include: {
                posts: {
                    include: { comments: true }
                }
            }
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/all", async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: { posts: true }, //saara data display krdega
            orderBy: { createdAt: "desc" }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/transfer",async(req,res)=>{
    try{
        const{senderId,receiverId,amount}=req.body;
        //async(tx) -> blocks transaction until all operations inside are complete
            const transaction = await prisma.$transaction(async(tx)=>{
            const sender = await tx.user.findUnique({
                where:{id:senderId}
            });
    
    //step 1 -> balance check
    if(!sender || sender.balance<=amount){
        throw new Error("Insufficient balance");
    }
    //step 2 -> amount deduction

    await tx.user.update({
        where:{id:senderId},
        // data:{balance:sender.balance - amount}
        data:{balance:{decrement:amount}} 
    })

    //step 3 -> receiver balance update
    await tx.user.update({
        where:{id:receiverId},
        data:{balance:{increment:amount}} 
    })

    //step 4 -> transaction table entry (history)

    const trns = await tx.transactions.create({
        data:{
            amount,senderId,receiverId
        }
    });

    return trns;

});
    res.status(200).json(transaction);
}
catch(error){
        res.status(400).json({error:error.message});
} 
});

module.exports = router;
