/* eslint-disable no-undef */
import { StatusCodes } from 'http-status-codes';
import supertest, { SuperTest, Test } from 'supertest';
import app from '../../app';
import { testDBHandler } from '../../utils/test-utils/dbHandler.utils';

describe('Academic Semester Controller', () => {
  const agent: SuperTest<Test> = supertest(app);

  beforeAll(async () => await testDBHandler.connect());
  // beforeEach(async () => await testDBHandler.clearData());
  afterAll(async () => {
    await testDBHandler.clearData();
    await testDBHandler.disconnect();
  });

  it('should create a semester', async () => {
    const newSemester = {
      title: 'Spring',
      year: 2024,
      code: '01',
      startMonth: 'September',
      endMonth: 'December',
    };

    const res = await agent.get('/csrf-token');
    const resBody = JSON.parse(res.text);
    const csrfToken = resBody.csrfToken;

    const response = await agent
      .post('/api/v1/academic-semesters/create-semester')
      // .set({
      //   Accept: 'application/json',
      //   'X-CSRF-Token': csrfToken,
      // })
      .send(newSemester);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Semester created successfully');
    expect(response.body.data).toEqual(
      expect.objectContaining({
        title: 'Spring',
        year: 2024,
        code: '01',
        startMonth: 'September',
        endMonth: 'December',
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: 0,
        id: expect.any(String),
      }),
    );
  });

  it('should get all semesters', async () => {
    const response = await agent.get('/api/v1/academic-semesters').query({ page: 1, limit: 10 });

    const { data: responseBody } = JSON.parse(response.text);

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Semesters information found');
    expect(responseBody).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: '01',
          endMonth: 'December',
          startMonth: 'September',
          title: 'Spring',
          year: 2024,
        }),
      ]),
    );
  });
});
