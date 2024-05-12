const Post = require('../models/post');

// Create a post
exports.createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        console.log(post)
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
    try {
        let post;
        if (req.params.id != null) {
            post = await Post.findById(req.params.id);
        }
        else {
            post = await Post.find();
        }
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndRemove(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
