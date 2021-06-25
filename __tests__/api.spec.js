const request = require('supertest');
const { app }= require('../app');

describe('API server', () => {
    let api;
    let testTask = {
        task: 'go for a walk'
    };
    let port = 5000;

    beforeAll(()=>{
        api = app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
    })

    test('Get items responds with status 200', (done)=>{
        request(api).get('/items').expect(200,done);
    })

    test('Post a new task responds with status 201', (done) => {
        request(api)
        .post('/items')
        .send(testTask)
        .set('Accept', /application\/json/)
        .expect(201,done)
    })

    test('responds to delete /items/:id with status 204', async () => {
        await request(api).delete('/items/2').expect(204);

        const updatedTasks = await request(api).get('/items');
        console.log(updatedTasks.body);

        expect(updatedTasks.body.length).toBe(2);
    });

    afterAll((done) => {
        console.log('server closed');
        api.close(done)
    })
})