import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { bugService } from '../../services/bugService';

// Mock fetch globally
global.fetch = vi.fn();

describe('BugService', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getBugs', () => {
    it('should fetch bugs successfully', async () => {
      const mockResponse = {
        success: true,
        data: [
          { _id: '1', title: 'Bug 1' },
          { _id: '2', title: 'Bug 2' }
        ]
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await bugService.getBugs();

      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/bugs', {
        headers: { 'Content-Type': 'application/json' }
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle filters correctly', async () => {
      const mockResponse = { success: true, data: [] };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      await bugService.getBugs({ status: 'open', severity: 'high' });

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:5000/api/bugs?status=open&severity=high',
        { headers: { 'Content-Type': 'application/json' } }
      );
    });

    it('should handle API errors', async () => {
      const mockErrorResponse = {
        success: false,
        message: 'Server error'
      };

      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => mockErrorResponse
      });

      await expect(bugService.getBugs()).rejects.toThrow('Server error');
    });

    it('should handle network errors', async () => {
      fetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

      await expect(bugService.getBugs()).rejects.toThrow(
        'Unable to connect to server. Please check if the server is running.'
      );
    });
  });

  describe('createBug', () => {
    it('should create bug successfully', async () => {
      const bugData = {
        title: 'New Bug',
        description: 'Bug description',
        reportedBy: 'John Doe'
      };

      const mockResponse = {
        success: true,
        data: { _id: '123', ...bugData }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await bugService.createBug(bugData);

      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/api/bugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bugData)
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('updateBug', () => {
    it('should update bug successfully', async () => {
      const bugId = '123';
      const bugData = {
        title: 'Updated Bug',
        description: 'Updated description'
      };

      const mockResponse = {
        success: true,
        data: { _id: bugId, ...bugData }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await bugService.updateBug(bugId, bugData);

      expect(fetch).toHaveBeenCalledWith(`http://localhost:5000/api/bugs/${bugId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bugData)
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteBug', () => {
    it('should delete bug successfully', async () => {
      const bugId = '123';
      const mockResponse = {
        success: true,
        message: 'Bug deleted successfully'
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await bugService.deleteBug(bugId);

      expect(fetch).toHaveBeenCalledWith(`http://localhost:5000/api/bugs/${bugId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      expect(result).toEqual(mockResponse);
    });
  });
});