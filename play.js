require('./src/db/mongoose');

const User = require('./src/models/users');
// const Task = require('./src/models/task');

const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, {age});
    const count = await User.countDocuments({age});

    return count;
};

// const findAndDelete = async (id, completed) => {
//     const user = await User.findByIdAndDelete(id);
//     const count = await User.countDocuments({completed :'true'})
// }


updateAgeAndCount('5ed16f6d7c04f179e7712f75', 1).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e)
})