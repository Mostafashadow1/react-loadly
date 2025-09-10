import React from 'react';
import { render, screen } from '@testing-library/react';
import { RotateLoader } from '../components/organisms/RotateLoader';

describe('RotateLoader', () => {
  it('renders with default props', () => {
    render(<RotateLoader data-testid="rotate-loader" />);
    
    const loader = screen.getByTestId('rotate-loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('role', 'status');
    expect(loader).toHaveAttribute('aria-busy', 'true');
  });

  it('does not render when loading is false', () => {
    render(<RotateLoader loading={false} data-testid="rotate-loader" />);
    
    const loader = screen.queryByTestId('rotate-loader');
    expect(loader).not.toBeInTheDocument();
  });

  it('renders with custom props', () => {
    render(
      <RotateLoader
        size={20}
        color="#ff00ff"
        count={4}
        showText
        loadingText="Spinning..."
        data-testid="rotate-loader"
      />
    );
    
    const loader = screen.getByTestId('rotate-loader');
    expect(loader).toBeInTheDocument();
    
    const text = screen.getByText('Spinning...');
    expect(text).toBeInTheDocument();
    
    // Check that 4 elements are rendered
    const elements = screen.getAllByTestId(/rotate-loader-element/);
    expect(elements).toHaveLength(4);
  });

  it('applies custom className and style', () => {
    const customStyle = { transform: 'scale(1.2)' };
    render(
      <RotateLoader
        className="custom-rotate-loader"
        style={customStyle}
        data-testid="rotate-loader"
      />
    );
    
    const loader = screen.getByTestId('rotate-loader');
    expect(loader).toHaveClass('custom-rotate-loader');
    expect(loader).toHaveStyle('transform: scale(1.2)');
  });
});