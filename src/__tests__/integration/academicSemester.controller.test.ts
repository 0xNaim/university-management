/* eslint-disable no-undef */
import { StatusCodes } from 'http-status-codes';
import supertest, { SuperTest, Test } from 'supertest';
import app from '../../app';
import { testDBHandler } from '../../utils/test-utils/dbHandler.utils';

describe('Academic Semester Controller', () => {
  const agent: SuperTest<Test> = supertest(app);

  beforeAll(async () => await testDBHandler.connect());
  beforeEach(async () => await testDBHandler.clearData());
  afterAll(async () => await testDBHandler.disconnect());

  it('should create a semester', async () => {
    const newSemester = {
      name: 'Spring',
      year: 2024,
      code: '01',
      startMonth: 'September',
      endMonth: 'December',
    };

    const response = await agent.post('/api/v1/academic-semesters/create-semester').send(newSemester);

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Semester created successfully');
    expect(response.body.data).toEqual(
      expect.objectContaining({
        name: 'Spring',
        year: 2026,
        code: '01',
        startMonth: 'September',
        endMonth: 'December',
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: expect.any(Number),
      }),
    );
  }, 100000);

  it('should get all semesters', async () => {
    const response = await agent.get('/api/v1/academic-semesters').query({ page: 1, limit: 10 });

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Semesters information found');
    expect(response.body.data).toEqual(
      expect.arrayContaining([
        {
          name: expect.any(String),
          year: expect.any(Number),
          code: expect.any(String),
          startMonth: expect.any(String),
          endMonth: expect.any(String),
          _id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          __v: expect.any(Number),
        },
      ]),
    );
  }, 100000);
});
