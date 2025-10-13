const express = require('express');
const prisma = require('../prisma/client');
const router = express.Router();


router.post("/create", async (req, res) => {
    try {
        const { title, description, authorId } = req.body;

        const post = await prisma.post.create({
            data: {
                title,
                description,
                author: {
                    connect: { id : authorId }
                }
            }
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/all", async (req, res) => {
    try {
        const allPosts = await prisma.post.findMany({
            include: { 
                author: true, 
                comments: {include: { author: true }}
            },
            // orderBy: {createdAt: 'desc'}
        });
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/pagination", async(req,res)=>{ // ek page pe kitne items show hongi and next page pe jaoge toh automatically next items show honge
    try {
        const { page=1 , limit=20 } = req.query; // page 0 is home page
        const skipCount = (page - 1) * limit;
        const posts = await prisma.post.findMany({
            include:{
                author:true,
                comments: true
            },
            take :parseInt(limit), //by default value goes in string so convert it into number
            skip:skipCount
        })
        res.status(200).json(posts);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;