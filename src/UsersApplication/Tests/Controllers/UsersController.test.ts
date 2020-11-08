import request from 'supertest';

import { app } from '../..';

let id: string;

it('add user', done => {
  request(app)
    .post('/api/users')
    .send({
      Password: 'errtt98123',
      Login: '242dsfsdf',
      Age: 17
    })
    .expect(res => {
      expect(res.text);
      id = res.text.substring(1, res.text.length - 1);
    })
    .end(done);
});

it('get user', done => {
  if (id) {
    request(app)
      .get(`/api/users/${id}`)
      .expect(res => {
        expect(res.body.Id).toBe(id);
      })
      .end(done);
  }
});

it('update user', done => {
  request(app)
    .put(`/api/users/${id}`)
    .send({
      Login: 'NewKraiLogin111'
    })
    .expect(res => {
      expect(res.status === 200);
    })
    .end(done);
});

it('delete user', done => {
  request(app)
    .delete(`/api/users/${id}`)
    .expect(res => {
      expect(res.status === 200);
    })
    .end(done);
});

