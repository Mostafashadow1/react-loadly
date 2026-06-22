import React from 'react';
import { render, screen } from '@testing-library/react';
import { DotsLoader } from '../components/organisms/DotsLoader';

describe('DotsLoader', () => {
  it('renders with default props', () => {
    render(<DotsLoader data-testid="dots-loader" />);
    
    const loader = screen.getByTestId('dots-loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('role', 'status');
    expect(loader).toHaveAttribute('aria-busy', 'true');
  });

  it('does not render when loading is false', () => {
    render(<DotsLoader loading={false} data-testid="dots-loader" />);
    
    const loader = screen.queryByTestId('dots-loader');
    expect(loader).not.toBeInTheDocument();
  });

  it('renders with custom props', () => {
    render(
      <DotsLoader
        size={16}
        color="#ffff00"
        count={6}
        showText
        loadingText="Connecting..."
        data-testid="dots-loader"
      />
    );
    
    const loader = screen.getByTestId('dots-loader');
    expect(loader).toBeInTheDocument();
    
    const text = screen.getByText('Connecting...');
    expect(text).toBeInTheDocument();
    
    // Check that 6 dots are rendered
    const dots = screen.getAllByTestId(/dots-loader-dot/);
    expect(dots).toHaveLength(6);
  });

  it('applies custom className and style', () => {
    const customStyle = { backgroundColor: '#f0f0f0' };
    render(
      <DotsLoader
        className="custom-dots-loader"
        style={customStyle}
        data-testid="dots-loader"
      />
    );
    
    const loader = screen.getByTestId('dots-loader');
    expect(loader).toHaveClass('custom-dots-loader');
    expect(loader).toHaveStyle('background-color: #f0f0f0');
  });
});