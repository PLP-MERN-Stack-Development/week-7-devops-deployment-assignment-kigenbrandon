import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import BugForm from '../../components/BugForm';

describe('BugForm', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  it('renders form correctly for new bug', () => {
    render(
      <BugForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );

    expect(screen.getByText('Report New Bug')).toBeInTheDocument();
    expect(screen.getByLabelText('Bug Title *')).toBeInTheDocument();
    expect(screen.getByLabelText('Description *')).toBeInTheDocument();
    expect(screen.getByLabelText('Reported By *')).toBeInTheDocument();
    expect(screen.getByText('Create Bug')).toBeInTheDocument();
  });

  it('renders form correctly for editing bug', () => {
    const bug = {
      title: 'Existing Bug',
      description: 'Existing description',
      severity: 'high',
      status: 'in-progress',
      priority: 'high',
      reportedBy: 'John Doe'
    };

    render(
      <BugForm 
        bug={bug}
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );

    expect(screen.getByText('Edit Bug')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing Bug')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing description')).toBeInTheDocument();
    expect(screen.getByText('Update Bug')).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();

    render(
      <BugForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );

    const submitButton = screen.getByText('Create Bug');
    await user.click(submitButton);

    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Description is required')).toBeInTheDocument();
    expect(screen.getByText('Reporter is required')).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('validates field length limits', async () => {
    const user = userEvent.setup();

    render(
      <BugForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );

    const titleInput = screen.getByLabelText('Bug Title *');
    const descriptionInput = screen.getByLabelText('Description *');

    // Enter text exceeding limits
fireEvent.change(titleInput, { target: { value: 'a'.repeat(101) } });
fireEvent.change(descriptionInput, { target: { value: 'a'.repeat(1001) } });

    const submitButton = screen.getByText('Create Bug');
    await user.click(submitButton);

    expect(screen.getByText('Title cannot exceed 100 characters')).toBeInTheDocument();
    expect(screen.getByText('Description cannot exceed 1000 characters')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValue();

    render(
      <BugForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );

    await user.type(screen.getByLabelText('Bug Title *'), 'Test Bug');
    await user.type(screen.getByLabelText('Description *'), 'Test description');
    await user.type(screen.getByLabelText('Reported By *'), 'John Doe');

    const submitButton = screen.getByText('Create Bug');
    await user.click(submitButton);

    await waitFor(() => {
  expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
    title: 'Test Bug',
    description: 'Test description',
    severity: 'medium',
    status: 'open',
    priority: 'medium',
    reportedBy: 'John Doe',
    assignedTo: '',
    environment: '',
    stepsToReproduce: ''
  }));
});

  });

  it('calls onCancel when cancel button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <BugForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );

    const cancelButton = screen.getByText('Cancel');
    await user.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('clears errors when user starts typing', async () => {
    const user = userEvent.setup();

    render(
      <BugForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel} 
      />
    );

    // Trigger validation error
    const submitButton = screen.getByText('Create Bug');
    await user.click(submitButton);

    expect(screen.getByText('Title is required')).toBeInTheDocument();

    // Start typing in title field
    const titleInput = screen.getByLabelText('Bug Title *');
    await user.type(titleInput, 'T');

    await waitFor(() => {
      expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
    });
  });
});