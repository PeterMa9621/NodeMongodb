var Database = require('./database');

async function databaseTest() {
    const database = Database.getInstance();
    console.log('B');
    let client = await database.connect();
    console.log('Connecting Database');
    client = await database.connect();
    const db = client.db('test');
    const items = db.collection('test1').find({'role.china':'citizen'}).toArray().then(items => {
        items.forEach((item) => {
            console.log(item);
        });
    });
    console.log('C');

    const people = db.collection('test1').find({
        age: {
            $lt: 30
        }
    }).toArray().then(items => {
        console.log(items);
    });

    //console.log(items);
    // perform actions on the collection object
    Database.getInstance().close();
}

module.exports = databaseTest;