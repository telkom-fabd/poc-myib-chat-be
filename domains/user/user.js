const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'buyer', 'seller'],
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    registered_at: {
      type: Date,
      default: Date.now,
    },
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
    },
    programs: [
        {
            program: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Program',
            },
            status: String,
        }
    ]
  },
  { timestamps: true }
);

// index filter
userSchema.index({ email: 1 }, { name: 'user_email_idx' });
userSchema.index({ status: 1 }, { name: 'user_status_idx' });

exports.User = mongoose.model('User', userSchema);

// PROGRAM
const programSchema = mongoose.Schema(
  {
    title: String,
    organizer: String,
    image: String,
    price: Number,
    description: String,
    modules: [
      {
        id: Number,
        title: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

// index filter
exports.Program = mongoose.model('Program', programSchema);
