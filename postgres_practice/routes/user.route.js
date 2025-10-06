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

module.exports = router;
