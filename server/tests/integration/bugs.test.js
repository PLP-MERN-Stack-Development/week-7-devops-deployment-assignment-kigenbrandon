const request = require('supertest');
const app = require('../../src/server.js');
const Bug = require('../../src/models/Bug.js');

describe('Bug API Endpoints', () => {
  const sampleBug = {
    title: 'Test Bug',
    description: 'This is a test bug description',
    severity: 'medium',
    status: 'open',
    priority: 'high',
    reportedBy: 'John Doe',
    environment: 'Chrome 91',
    stepsToReproduce: '1. Open app\n2. Click button\n3. See error'
  };

  describe('POST /api/bugs', () => {
    test('should create a new bug', async () => {
      const response = await request(app)
        .post('/api/bugs')
        .send(sampleBug)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(sampleBug.title);
      expect(response.body.data.description).toBe(sampleBug.description);
      expect(response.body.message).toBe('Bug created successfully');
    });

    test('should fail with missing title', async () => {
      const invalidBug = { ...sampleBug };
      delete invalidBug.title;

      const response = await request(app)
        .post('/api/bugs')
        .send(invalidBug)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toContain('Title is required');
    });

    test('should fail with missing description', async () => {
      const invalidBug = { ...sampleBug };
      delete invalidBug.description;

      const response = await request(app)
        .post('/api/bugs')
        .send(invalidBug)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toContain('Description is required');
    });

    test('should sanitize malicious input', async () => {
      const maliciousBug = {
        ...sampleBug,
        title: '<script>alert("XSS")</script>Malicious Title',
        description: 'Normal description'
      };

      const response = await request(app)
        .post('/api/bugs')
        .send(maliciousBug)
        .expect(201);

      expect(response.body.data.title).toBe('Malicious Title');
    });
  });

  describe('GET /api/bugs', () => {
    beforeEach(async () => {
      // Create test bugs
      await Bug.create([
        { ...sampleBug, title: 'Bug 1', severity: 'high' },
        { ...sampleBug, title: 'Bug 2', severity: 'low' },
        { ...sampleBug, title: 'Bug 3', status: 'resolved' }
      ]);
    });

    test('should get all bugs', async () => {
      const response = await request(app)
        .get('/api/bugs')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(3);
      expect(response.body.pagination.total).toBe(3);
    });

    test('should filter bugs by status', async () => {
      const response = await request(app)
        .get('/api/bugs?status=resolved')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].status).toBe('resolved');
    });

    test('should filter bugs by severity', async () => {
      const response = await request(app)
        .get('/api/bugs?severity=high')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].severity).toBe('high');
    });

    test('should paginate results', async () => {
      const response = await request(app)
        .get('/api/bugs?page=1&limit=2')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(2);
    });
  });

  describe('GET /api/bugs/:id', () => {
    let bugId;

    beforeEach(async () => {
      const bug = await Bug.create(sampleBug);
      bugId = bug._id;
    });

    test('should get a specific bug', async () => {
      const response = await request(app)
        .get(`/api/bugs/${bugId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(sampleBug.title);
    });

    test('should return 404 for non-existent bug', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .get(`/api/bugs/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Bug not found');
    });

    test('should return 400 for invalid ID format', async () => {
      const response = await request(app)
        .get('/api/bugs/invalid-id')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid bug ID format');
    });
  });

  describe('PUT /api/bugs/:id', () => {
    let bugId;

    beforeEach(async () => {
      const bug = await Bug.create(sampleBug);
      bugId = bug._id;
    });

    test('should update a bug', async () => {
      const updatedData = {
        ...sampleBug,
        title: 'Updated Bug Title',
        status: 'in-progress'
      };

      const response = await request(app)
        .put(`/api/bugs/${bugId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Updated Bug Title');
      expect(response.body.data.status).toBe('in-progress');
    });

    test('should return 404 for non-existent bug', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .put(`/api/bugs/${fakeId}`)
        .send(sampleBug)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Bug not found');
    });
  });

  describe('DELETE /api/bugs/:id', () => {
    let bugId;

    beforeEach(async () => {
      const bug = await Bug.create(sampleBug);
      bugId = bug._id;
    });

    test('should delete a bug', async () => {
      const response = await request(app)
        .delete(`/api/bugs/${bugId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Bug deleted successfully');

      // Verify bug is deleted
      const bug = await Bug.findById(bugId);
      expect(bug).toBeNull();
    });

    test('should return 404 for non-existent bug', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const response = await request(app)
        .delete(`/api/bugs/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Bug not found');
    });
  });
});