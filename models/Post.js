const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postedBy: { type: mongoose.Schema.Types.ObjectId, required: true },
  postContent: { type: String, required: true },
  image: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  latitude : { type : Number, required : true},
  longitude : { type : Number, required : true}
});

module.exports = mongoose.model("post", postSchema);
