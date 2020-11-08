import request from 'supertest';

import { app } from '../..';

let id: string;

it('add group', done => {
  request(app)
    .post('/api/groups')
    .send({
      Name: 'TestGroupOne',
      Permissions: ['READ']
    })
    .expect(res => {
      expect(res.text);
      id = res.text.substring(1, res.text.length - 1);
    })
    .end(done);
});

it('get group', done => {
  if (id) {
    request(app)
      .get(`/api/groups/${id}`)
      .expect(res => {
        expect(res.body.Id).toBe(id);
      })
      .end(done);
  }
});

it('update group', done => {
  request(app)
    .put(`/api/groups/${id}`)
    .send({
      Name: 'TestGroupOne_UPDATED'
    })
    .expect(res => {
      expect(res.status === 200);
    })
    .end(done);
});

it('delete group', done => {
  request(app)
    .delete(`/api/groups/${id}`)
    .expect(res => {
      expect(res.status === 200);
    })
    .end(done);
});

