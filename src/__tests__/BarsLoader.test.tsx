import React from 'react';
import { render, screen } from '@testing-library/react';
import { BarsLoader } from '../components/organisms/BarsLoader';

describe('BarsLoader', () => {
  it('renders with default props', () => {
    render(<BarsLoader data-testid="bars-loader" />);
    
    const loader = screen.getByTestId('bars-loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('role', 'status');
    expect(loader).toHaveAttribute('aria-busy', 'true');
  });

  it('does not render when loading is false', () => {
    render(<BarsLoader loading={false} data-testid="bars-loader" />);
    
    const loader = screen.queryByTestId('bars-loader');
    expect(loader).not.toBeInTheDocument();
  });

  it('renders with custom props', () => {
    render(
      <BarsLoader
        size={30}
        color="#0000ff"
        count={7}
        showText
        loadingText="Processing..."
        data-testid="bars-loader"
      />
    );
    
    const loader = screen.getByTestId('bars-loader');
    expect(loader).toBeInTheDocument();
    
    const text = screen.getByText('Processing...');
    expect(text).toBeInTheDocument();
    
    // Check that 7 bars are rendered
    const bars = screen.getAllByTestId(/bars-loader-bar/);
    expect(bars).toHaveLength(7);
  });

  it('applies custom className and style', () => {
    const customStyle = { padding: '10px' };
    render(
      <BarsLoader
        className="custom-bars-loader"
        style={customStyle}
        data-testid="bars-loader"
      />
    );
    
    const loader = screen.getByTestId('bars-loader');
    expect(loader).toHaveClass('custom-bars-loader');
    expect(loader).toHaveStyle('padding: 10px');
  });
});