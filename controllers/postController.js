const Post = require('../models/post');

// Create a post
exports.createPost = async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


// Controller function to get a post by ID or title
exports.getPostByIdOrTitle = (req, res) => {
    const { id, title } = req.query;
  
    let post;
  
    if (title) {
      post = posts.findOne(p => p.title.toLowerCase() === title.toLowerCase());
    }else if(id){
        post = posts.findById(id)
    }
    
  
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  };



  

// Get a post by ID
exports.getPostById = async (req, res) => {
    try {
        let post;
            post = await Post.find();
        
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
