const mongoose = require('mongoose');

const merchantSchema = mongoose.Schema(
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
merchantSchema.index({email: 1}, {name: 'merchant_email_idx'});
merchantSchema.index({status: 1}, {name: 'merchant_status_idx'});

// export model with schema
exports.Merchant = mongoose.model('Merchant', merchantSchema);
