const request = require('supertest');
const app = require('../server/index');

describe('DigitalX Agency API', () => {
  let server;
  
  beforeAll(() => {
    server = app.listen(0);
  });
  
  afterAll((done) => {
    server.close(done);
  });
  
  describe('Health Check', () => {
    it('should return health status', async () => {
      const res = await request(server).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body).toHaveProperty('version');
      expect(res.body).toHaveProperty('stats');
    });
  });
  
  describe('API Endpoints', () => {
    it('GET /api/pricing should return pricing tiers', async () => {
      const res = await request(server).get('/api/pricing');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('tiers');
      expect(Array.isArray(res.body.tiers)).toBe(true);
      expect(res.body.tiers.length).toBe(3);
    });
    
    it('POST /api/contact should create a lead', async () => {
      const res = await request(server)
        .post('/api/contact')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          company: 'Test Company',
          message: 'Test message for contact form'
        });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('leadId');
    });
    
    it('POST /api/contact should reject invalid email', async () => {
      const res = await request(server)
        .post('/api/contact')
        .send({
          name: 'Test User',
          email: 'invalid-email',
          message: 'Test message'
        });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
    
    it('POST /api/contact should reject missing fields', async () => {
      const res = await request(server)
        .post('/api/contact')
        .send({
          name: 'Test User'
        });
      expect(res.status).toBe(400);
    });
    
    it('POST /api/track should record analytics', async () => {
      const res = await request(server)
        .post('/api/track')
        .send({
          event: 'page_view',
          page: '/',
          data: { referrer: 'google' }
        });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
    
    it('POST /api/schedule should schedule consultation', async () => {
      const res = await request(server)
        .post('/api/schedule')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          preferredTime: '2026-04-15T10:00'
        });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
    });
    
    it('GET /api/analytics should return stats', async () => {
      const res = await request(server).get('/api/analytics');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('visitors');
      expect(res.body).toHaveProperty('leads');
    });
  });
});
