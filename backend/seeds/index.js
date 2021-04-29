const User = require('../models/user');
const Measurement = require('../models/measurement');

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect('mongodb://backend:27017/compass', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const seedDB = async () => {
    await User.deleteMany({});
    await Measurement.deleteMany({});

    // User seeds
    const user1 = new User({ username: 'giannakis5', name: 'giannis', email: 'giannis@gmail.com', idKey: 0 });
    const user2 = new User({ username: 'takis13', name: 'takis', email: 'takis@gmail.com', idKey: 1 });
    const user3 = new User({ username: 'patatakis28', name: 'patatakis', email: 'patatakis@gmail.com', idKey: 2 });
    const user4 = new User({ username: 'aris123', name: 'aris', email: 'arispap@gmail.com', idKey: 3 });
    const user5 = new User({ username: 'georgia22', name: 'georgia', email: 'georgia2@gmail.com', idKey: 4 });
    const user6 = new User({ username: 'vasilis124', name: 'vasilis', email: 'vasilis21@gmail.com', idKey: 5 });
    const user7 = new User({ username: 'vanessarocks', name: 'vanessa', email: 'vanessarocks@gmail.com', idKey: 6 });

    await user1.save();
    await user2.save();
    await user3.save();
    await user4.save();
    await user5.save();
    await user6.save();
    await user7.save();


    // Measurement seeds
    let measurementCounter = 0;

    while (measurementCounter < 10) {
        let measurement = new Measurement({ user: user1.id, x: 39.67326618500352 + measurementCounter * 0.0001, y: 20.85536924387071 + measurementCounter * 0.0001, speed: 2.5, date: `2021-04-23T09:20:1${measurementCounter}.461Z` });
        measurement.xHatOriginal = [[measurement.x], [measurement.y], [measurement.speed]];
        measurement.xHat = [[measurement.x], [measurement.y], [measurement.speed]];
        measurement.xHatNew = [[measurement.x + 0.00001], [measurement.y + 0.00001], [measurement.speed]];
        await measurement.save();
        await user1.measurements.push(measurement);
        measurementCounter++;
    }
    await user1.save();

    let measurement1 = new Measurement({ user: user2.id, x: 39.67284741191456, y: 20.855785109192706, speed: 2.5, date: '2021-04-23T09:20:15.461Z' });
    measurement1.xHatOriginal = [[measurement1.x - 0.0001], [measurement1.y - 0.0001], [measurement1.speed]];
    measurement1.xHatNew = [[measurement1.x], [measurement1.y], [measurement1.speed]];

    let measurement2 = new Measurement({ user: user2.id, x: 39.672772363589985, y: 20.855996595106472, speed: 2.5, date: '2021-04-23T09:20:15.461Z' });
    measurement2.xHatOriginal = [[measurement2.x - 0.0001], [measurement2.y - 0.0001], [measurement2.speed]];
    measurement2.xHatNew = [[measurement2.x], [measurement2.y], [measurement2.speed]];

    let measurement3 = new Measurement({ user: user2.id, x: 39.672751718543545, y: 20.856187031939164, speed: 2.5, date: '2021-04-23T09:20:15.461Z' });
    measurement3.xHatOriginal = [[measurement3.x - 0.0001], [measurement3.y - 0.0001], [measurement3.speed]];
    measurement3.xHatNew = [[measurement3.x], [measurement3.y], [measurement3.speed]];

    let measurement4 = new Measurement({ user: user2.id, x: 39.67265468674271, y: 20.856516943635235, speed: 2.5, date: '2021-04-23T09:20:15.461Z' });
    measurement4.xHatOriginal = [[measurement4.x - 0.0001], [measurement4.y - 0.0001], [measurement4.speed]];
    measurement4.xHatNew = [[measurement4.x], [measurement4.y], [measurement4.speed]];

    let measurement5 = new Measurement({ user: user2.id, x: 39.67265881575828, y: 20.856811986615458, speed: 2.5, date: '2021-04-23T09:20:15.461Z' });
    measurement5.xHatOriginal = [[measurement5.x - 0.0001], [measurement5.y - 0.0001], [measurement5.speed]];
    measurement5.xHatNew = [[measurement5.x], [measurement5.y], [measurement5.speed]];

    let measurement6 = new Measurement({ user: user2.id, x: 39.67272900898535, y: 20.85709361855113, speed: 2.5, date: '2021-04-23T09:20:15.461Z' });
    measurement6.xHatOriginal = [[measurement6.x - 0.0001], [measurement6.y - 0.0001], [measurement6.speed]];
    measurement6.xHatNew = [[measurement6.x], [measurement6.y], [measurement6.speed]];

    let measurement7 = new Measurement({ user: user2.id, x: 39.67275791205814, y: 20.857195542489755, speed: 2.5, date: '2021-04-23T09:20:15.461Z' });
    measurement7.xHatOriginal = [[measurement7.x - 0.0001], [measurement7.y - 0.0001], [measurement7.speed]];
    measurement7.xHatNew = [[measurement7.x], [measurement7.y], [measurement7.speed]];

    let measurement8 = new Measurement({ user: user2.id, x: 39.67283636319471, y: 20.857501314305622, speed: 2.5, date: '2021-04-23T09:20:15.461Z' });
    measurement8.xHatOriginal = [[measurement8.x - 0.0001], [measurement8.y - 0.0001], [measurement8.speed]];
    measurement8.xHatNew = [[measurement8.x], [measurement8.y], [measurement8.speed]];

    let measurement9 = new Measurement({ user: user2.id, x: 39.67286113721932, y: 20.857605920453157, speed: 2.5, date: '2021-04-23T09:20:15.461Z' });
    measurement9.xHatOriginal = [[measurement9.x - 0.0001], [measurement9.y - 0.0001], [measurement9.speed]];
    measurement9.xHatNew = [[measurement9.x], [measurement9.y], [measurement9.speed]];

    let measurement10 = new Measurement({ user: user2.id, x: 39.67298913620495, y: 20.85796533644725, speed: 2.5, date: '2021-04-23T09:20:15.461Z' });
    measurement10.xHatOriginal = [[measurement10.x - 0.0001], [measurement10.y - 0.0001], [measurement10.speed]];
    measurement10.xHatNew = [[measurement10.x], [measurement10.y], [measurement10.speed]];


    await measurement1.save();
    await measurement2.save();
    await measurement3.save();
    await measurement4.save();
    await measurement5.save();
    await measurement6.save();
    await measurement7.save();
    await measurement8.save();
    await measurement9.save();
    await measurement10.save();

    await user2.measurements.push(measurement1, measurement2, measurement3, measurement4, measurement5, measurement6, measurement7, measurement8, measurement9, measurement10);
    await user2.save();

    await user1.olderMeasurements.push(user2.measurements);
    await user1.save();

    let measurement11 = new Measurement({ user: user1.id, x: 39.67284741191457, y: 20.85578510919271, speed: 2.5, date: '2021-04-22T09:20:15.461Z' });
    measurement11.xHatOriginal = [[measurement11.x], [measurement11.y], [measurement11.speed]];
    measurement11.xHatNew = [[measurement11.x + 0.0001], [measurement11.y + 0.0001], [measurement11.speed]];

    let measurement21 = new Measurement({ user: user1.id, x: 39.67277236358999, y: 20.85599659510648, speed: 2.5, date: '2021-04-22T09:20:15.461Z' });
    measurement21.xHatOriginal = [[measurement21.x], [measurement21.y], [measurement21.speed]];
    measurement21.xHatNew = [[measurement21.x + 0.0001], [measurement21.y + 0.0001], [measurement21.speed]];

    let measurement31 = new Measurement({ user: user1.id, x: 39.67275171854355, y: 20.85618703193917, speed: 2.5, date: '2021-04-22T09:20:15.461Z' });
    measurement31.xHatOriginal = [[measurement31.x], [measurement31.y], [measurement31.speed]];
    measurement31.xHatNew = [[measurement31.x + 0.0001], [measurement31.y + 0.0001], [measurement31.speed]];

    let measurement41 = new Measurement({ user: user1.id, x: 39.6726546867428, y: 20.856516943635236, speed: 2.5, date: '2021-04-22T09:20:15.461Z' });
    measurement41.xHatOriginal = [[measurement41.x], [measurement41.y], [measurement41.speed]];
    measurement41.xHatNew = [[measurement41.x + 0.0001], [measurement41.y + 0.0001], [measurement41.speed]];

    let measurement51 = new Measurement({ user: user1.id, x: 39.6726588157583, y: 20.856811986615459, speed: 2.5, date: '2021-04-22T09:20:15.461Z' });
    measurement51.xHatOriginal = [[measurement51.x], [measurement51.y], [measurement51.speed]];
    measurement51.xHatNew = [[measurement51.x + 0.0001], [measurement51.y + 0.0001], [measurement51.speed]];

    let measurement61 = new Measurement({ user: user1.id, x: 39.6727290089854, y: 20.857093618551134, speed: 2.5, date: '2021-04-22T09:20:15.461Z' });
    measurement61.xHatOriginal = [[measurement61.x], [measurement61.y], [measurement61.speed]];
    measurement61.xHatNew = [[measurement61.x + 0.0001], [measurement61.y + 0.0001], [measurement61.speed]];

    let measurement71 = new Measurement({ user: user1.id, x: 39.6727579120582, y: 20.857195542489756, speed: 2.5, date: '2021-04-22T09:20:15.461Z' });
    measurement71.xHatOriginal = [[measurement71.x], [measurement71.y], [measurement71.speed]];
    measurement71.xHatNew = [[measurement71.x + 0.0001], [measurement71.y + 0.0001], [measurement71.speed]];

    let measurement81 = new Measurement({ user: user1.id, x: 39.6728363631948, y: 20.857501314305623, speed: 2.5, date: '2021-04-22T09:20:15.461Z' });
    measurement81.xHatOriginal = [[measurement81.x], [measurement81.y], [measurement81.speed]];
    measurement81.xHatNew = [[measurement81.x + 0.0001], [measurement81.y + 0.0001], [measurement81.speed]];

    let measurement91 = new Measurement({ user: user1.id, x: 39.6728611372194, y: 20.857605920453158, speed: 2.5, date: '2021-04-22T09:20:15.461Z' });
    measurement91.xHatOriginal = [[measurement91.x], [measurement91.y], [measurement91.speed]];
    measurement91.xHatNew = [[measurement91.x + 0.0001], [measurement91.y + 0.0001], [measurement91.speed]];

    let measurement101 = new Measurement({ user: user1.id, x: 39.672989136205, y: 20.857965336447254, speed: 2.5, date: '2021-04-22T09:20:15.461Z' });
    measurement101.xHatOriginal = [[measurement101.x], [measurement101.y], [measurement101.speed]];
    measurement101.xHatNew = [[measurement101.x + 0.0001], [measurement101.y + 0.0001], [measurement101.speed]];


    await measurement11.save();
    await measurement21.save();
    await measurement31.save();
    await measurement41.save();
    await measurement51.save();
    await measurement61.save();
    await measurement71.save();
    await measurement81.save();
    await measurement91.save();
    await measurement101.save();

    await user1.olderMeasurements.push([measurement11, measurement21, measurement31, measurement41, measurement51, measurement61, measurement71, measurement81, measurement91, measurement101]);
    await user1.save();

    console.log(user1, user2, user3);
}

seedDB();
console.log("Seeding done!");