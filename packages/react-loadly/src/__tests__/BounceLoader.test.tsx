import React from 'react';
import { render, screen } from '@testing-library/react';
import { BounceLoader } from '../components/organisms/BounceLoader';

describe('BounceLoader', () => {
  it('renders with default props', () => {
    render(<BounceLoader data-testid="bounce-loader" />);
    
    const loader = screen.getByTestId('bounce-loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('role', 'status');
    expect(loader).toHaveAttribute('aria-busy', 'true');
  });

  it('does not render when loading is false', () => {
    render(<BounceLoader loading={false} data-testid="bounce-loader" />);
    
    const loader = screen.queryByTestId('bounce-loader');
    expect(loader).not.toBeInTheDocument();
  });

  it('renders with custom props', () => {
    render(
      <BounceLoader
        size={20}
        color="#ff0000"
        count={5}
        showText
        loadingText="Please wait..."
        data-testid="bounce-loader"
      />
    );
    
    const loader = screen.getByTestId('bounce-loader');
    expect(loader).toBeInTheDocument();
    
    const text = screen.getByText('Please wait...');
    expect(text).toBeInTheDocument();
    
    // Check that 5 balls are rendered
    const balls = screen.getAllByTestId(/bounce-loader-ball/);
    expect(balls).toHaveLength(5);
  });

  it('applies custom className and style', () => {
    const customStyle = { marginTop: '20px' };
    render(
      <BounceLoader
        className="custom-loader"
        style={customStyle}
        data-testid="bounce-loader"
      />
    );
    
    const loader = screen.getByTestId('bounce-loader');
    expect(loader).toHaveClass('custom-loader');
    expect(loader).toHaveStyle('margin-top: 20px');
  });
});