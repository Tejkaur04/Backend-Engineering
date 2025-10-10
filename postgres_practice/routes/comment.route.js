const express = require('express');
const prisma = require('../prisma/client');
const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const { comment,userId ,postId} = req.body;
        const post = await prisma.comment.create({
            data: {
                comment,
                authorId:userId,
                PostId:postId
            }
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;