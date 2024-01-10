const mongoose = require('mongoose');

const programSchema = mongoose.Schema(
  {
    title: string,
    organizer: string,
    image: string,
    price: number,
    description: string,
    modules: [
      {
        id: number,
        title: string,
        description: string,
      },
    ],
  },
  { timestamps: true }
);

// index filter
exports.program = mongoose.model('program', programSchema);
