const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const postSchema = new Schema({
    author: {
        type: String,
        required: true
      },
      authorImg: {
        type: String,
        required: true
      },
      authorOccupation: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      details: [{
        point: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        }
      }],
      imageUrl: {
        type: String,
        required: true
      }
},
{
    timestamps: true, 
});

module.exports = mongoose.model('Post', postSchema);
