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
            }
        });
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;