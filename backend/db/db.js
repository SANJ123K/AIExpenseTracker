const mongoose = require('mongoose');

// const db = async () => {
//     try {
//         mongoose.set('strictQuery', false)
//         await mongoose.connect(process.env.MONGO_URL)
//         console.log('Db Connected')
//     } catch (error) {
//         console.log('DB Connection Error');
//     }
// }


mongoose.set('strictQuery', false)
const db = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Cosmos DB');
}).catch((err) => {
    console.error('Error connecting to Cosmos DB:', err);
});

module.exports = db