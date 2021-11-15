const request = require('supertest');
const { expect } = require('chai');
const yup = require('yup');
const { createApp } = require('./../app');

const app = createApp();

/**
 * На данный момент при обращении к БД исполбзуются БД
 * для режима разработки "development"
 * Более подробную инфо можно найти в ./README.md
 */

// Данные для входа тестируемого юзера
const userCredentials = {
  email: 'buyer@gmail.com',
  password: '123456',
};

// Тестирование публичных end-point`ов app (т.е. не требующих наличия учетной записи)

describe('Testing app without auth', () => {
  describe('get /', () => {
    it('should return 200 Hello World', done => {
      request(app)
        .get('/')
        .expect(200)
        .expect('Hello World')
        .end(done);
    });
  });

  describe('/user', () => {
    it('should return 200 Hello World', done => {
      request(app)
        .get('/user')
        .expect(200)
        .expect({ name: 'Test' })
        .end(done);
    });
  });

  describe('post /login', () => {
    // Ожидаемая схема ответа
    const LOGIN_SUCCESS_BODY_SCHEMA = yup
      .object({
        token: yup.string().required(),
      })
      .required();

    it('with existing user`s credentials: should return 200 res.body.token:string', done => {
      request(app)
        .post('/login')
        .send(userCredentials) // Отправка на сервер тела запроса
        .expect(200) // Проверка возвращенного с сервера статус-кода
        .expect('Content-Type', /json/) // Проверка типа возвращенного с сервера тела ответа
        .then(res => {
          // Проверка тела ответа (res.body)
          // Получив тело ответа, можем использовать Chai.expect для его проверки
          // (тут: соответствует ли полученный объект ожидаемой схеме)
          expect(LOGIN_SUCCESS_BODY_SCHEMA.isValidSync(res.body)).to.be.true;
          done();
        })
        .catch(err => done(err));
    });

    it('with invalid credentials: should return 400 Invalid data for login', done => {
      request(app)
        .post('/login')
        .send({ email: 'qwerty', password: 'qwerty' })
        .expect(400)
        .expect('Invalid data for login')
        .end(done);
    });
  });

  it('with non existing user`s credentials: should return 404 user with this data didn`t exist', done => {
    request(app)
      .post('/login')
      .send({ email: 'qwerty@test.test', password: 'qwerty' })
      .expect(404)
      .expect('user with this data didn`t exist')
      .end(done);
  });
});

// Тестирование приватных end-point`ов app (т.е. требующих наличия учетной записи)
describe('app with auth', () => {
  // Для проверки прав доступа по всем маршрутам этого блока
  // сервер должен получить от пользователя токен

  /* Для получения токена эмулируется процесс аутентификации
   * (передача серверу логина/пароля с их проверкой сервером)
   * и получение от сервера токена,
   * который в дальнейших тестах будет передаваться серверу
   */

  let token;

  // before служит для выполнения ДО тестов
  // В данном случае ДО тестов нужно получить токен в ответ на имеющиеся в базе логин/пароль
  before(done => {
    request(app)
      .post('/login')
      .send(userCredentials)
      .end((err, res) => {
        token = res.body.token;
        return done();
      });
  });

  // Все тесты будут проводиться для пользователя, аутентифицированного в before,
  // т.е. с указанными в before email/password
  describe('post /getUser', () => {
    it('with right token: should return userData:object', done => {
      request(app)
        .post('/getUser')
        .set('Authorization', token) // Добавляем в хедерсы токен
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body.email).to.be.equal(userCredentials.email); // Проверка, содержит ли тело ответа email пользователя
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it('with wrong token: should return 408 token error', done => {
      request(app)
        .post('/getUser')
        .set('Authorization', 'some.other.string')
        .expect('token error')
        .expect(408)
        .end(done);
    });

    it('without token: should return 408 need token', done => {
      request(app)
        .post('/getUser')
        // .set('Authorization', 'some.other.string')
        .expect('need token')
        .expect(408)
        .end(done);
    });
  });
});
