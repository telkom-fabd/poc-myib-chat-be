const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
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
        name: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
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
    },
    {timestamps: true}
);

// index filter
customerSchema.index({email: 1}, {name: 'customer_email_idx'});
customerSchema.index({status: 1}, {name: 'customer_status_idx'});

// export model with schema
exports.Customer = mongoose.model('Customer', customerSchema);
