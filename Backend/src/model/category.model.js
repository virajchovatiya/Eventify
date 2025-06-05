import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);
export default Category;