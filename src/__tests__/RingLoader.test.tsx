import React from 'react';
import { render, screen } from '@testing-library/react';
import { RingLoader } from '../components/organisms/RingLoader';

describe('RingLoader', () => {
  it('renders with default props', () => {
    render(<RingLoader data-testid="ring-loader" />);
    
    const loader = screen.getByTestId('ring-loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('role', 'status');
    expect(loader).toHaveAttribute('aria-busy', 'true');
  });

  it('does not render when loading is false', () => {
    render(<RingLoader loading={false} data-testid="ring-loader" />);
    
    const loader = screen.queryByTestId('ring-loader');
    expect(loader).not.toBeInTheDocument();
  });

  it('renders with custom props', () => {
    render(
      <RingLoader
        size={80}
        color="#00ff00"
        borderWidth={6}
        showText
        loadingText="Loading data..."
        data-testid="ring-loader"
      />
    );
    
    const loader = screen.getByTestId('ring-loader');
    expect(loader).toBeInTheDocument();
    
    const text = screen.getByText('Loading data...');
    expect(text).toBeInTheDocument();
    
    // Check that 4 segments are rendered
    const segments = screen.getAllByTestId(/ring-loader-segment/);
    expect(segments).toHaveLength(4);
  });

  it('applies custom className and style', () => {
    const customStyle = { marginBottom: '30px' };
    render(
      <RingLoader
        className="custom-ring-loader"
        style={customStyle}
        data-testid="ring-loader"
      />
    );
    
    const loader = screen.getByTestId('ring-loader');
    expect(loader).toHaveClass('custom-ring-loader');
    expect(loader).toHaveStyle('margin-bottom: 30px');
  });
});