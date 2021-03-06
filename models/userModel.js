import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    },
    role: {
      type: String,
      default: 'user'
    },
    root: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/dosivta5n/image/upload/v1605540464/avatar/gknwcpfspfqazphp5too.jpg'
    }
  }, 
  {
    timestamps: true
  }
)

let Dataset = mongoose.models.user || mongoose.model('user', userSchema)
export default Dataset