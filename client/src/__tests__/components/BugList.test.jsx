import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BugList from '../../components/BugList';

const mockBugs = [
  {
    _id: '1',
    title: 'Test Bug 1',
    description: 'This is a test bug description',
    severity: 'high',
    status: 'open',
    priority: 'high',
    reportedBy: 'John Doe',
    assignedTo: 'Jane Smith',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '2',
    title: 'Test Bug 2',
    description: 'Another test bug description',
    severity: 'medium',
    status: 'in-progress',
    priority: 'medium',
    reportedBy: 'Alice Johnson',
    createdAt: '2024-01-02T00:00:00.000Z'
  }
];

describe('BugList', () => {
  it('renders bug list correctly', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <BugList 
        bugs={mockBugs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('Test Bug 1')).toBeInTheDocument();
    expect(screen.getByText('Test Bug 2')).toBeInTheDocument();
    expect(screen.getByText('This is a test bug description')).toBeInTheDocument();
    expect(screen.getByText('Another test bug description')).toBeInTheDocument();
  });

  it('displays empty state when no bugs', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <BugList 
        bugs={[]} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('No bugs found')).toBeInTheDocument();
    expect(screen.getByText('No bugs match your current search and filter criteria.')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <BugList 
        bugs={mockBugs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    const editButtons = screen.getAllByTitle('Edit bug');
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockBugs[0]);
  });

  it('shows confirmation dialog when delete button is clicked', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();
    
    // Mock window.confirm
    window.confirm = vi.fn(() => true);

    render(
      <BugList 
        bugs={mockBugs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    const deleteButtons = screen.getAllByTitle('Delete bug');
    fireEvent.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this bug?');
    expect(mockOnDelete).toHaveBeenCalledWith('1');
  });

  it('displays correct severity colors', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <BugList 
        bugs={mockBugs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    const highSeverityBadge = screen.getByText('high');
    const mediumSeverityBadge = screen.getByText('medium');

    expect(highSeverityBadge).toHaveClass('bg-orange-100', 'text-orange-800');
    expect(mediumSeverityBadge).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  it('displays assigned user when available', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <BugList 
        bugs={mockBugs} 
        onEdit={mockOnEdit} 
        onDelete={mockOnDelete} 
      />
    );

    expect(screen.getByText('Assigned to Jane Smith')).toBeInTheDocument();
    expect(screen.getByText(/Assigned to Jane Smith/i)).toBeInTheDocument();
  });
});