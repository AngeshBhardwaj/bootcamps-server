const mongoose = require('mongoose');

const BootcampSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Bootcamp name cannot be blank.'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters.']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Bootcamp description cannot be blank.'],
        maxlength: [500, 'Description cannot be more than 500 characters.']
    },
    website: {
        type: String,
        match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Please enter a valid web address starting with http/https.']
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number cannot be longer than 20 characters.']
    },
    email: {
        type: String,
        required: [true, 'Bootcamp email cannot be left blank.'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email for bootcamp contact.']
    },
    address: {
        type: String,
        required: [true, 'Bootcam address cannot be left blank.'],
        maxlength: [500, 'An address cannot be more than 500 characters long.']
    },
    location: {
        // GeoJSON Point
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        country: String,
        zipcode: String
    },
    careers: {
        type: [String],
        required: [true, 'Bootcamp needs to specify at least one career stream. Add "Others" if you are not sure.'],
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Others'
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1.'],
        max: [10, 'Rating cannot be more than 10.']
    },
    averageCost: {
        type: Number
    },
    photo: {
        type: String,   // name of the photo that was uploaded.
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);