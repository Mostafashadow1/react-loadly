import React from 'react';
import { render, screen } from '@testing-library/react';
import { SpinLoader } from '../components/organisms/SpinLoader';

describe('SpinLoader', () => {
  it('renders with default props', () => {
    render(<SpinLoader data-testid="spin-loader" />);
    
    const loader = screen.getByTestId('spin-loader');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('role', 'status');
    expect(loader).toHaveAttribute('aria-busy', 'true');
  });

  it('does not render when loading is false', () => {
    render(<SpinLoader loading={false} data-testid="spin-loader" />);
    
    const loader = screen.queryByTestId('spin-loader');
    expect(loader).not.toBeInTheDocument();
  });

  it('renders with custom props', () => {
    render(
      <SpinLoader
        size={60}
        color="#ff0000"
        showText
        loadingText="Please wait..."
        data-testid="spin-loader"
      />
    );
    
    const loader = screen.getByTestId('spin-loader');
    expect(loader).toBeInTheDocument();
    
    const text = screen.getByText('Please wait...');
    expect(text).toBeInTheDocument();
  });

  it('applies custom className and style', () => {
    const customStyle = { marginTop: '20px' };
    render(
      <SpinLoader
        className="custom-loader"
        style={customStyle}
        data-testid="spin-loader"
      />
    );
    
    const loader = screen.getByTestId('spin-loader');
    expect(loader).toHaveClass('custom-loader');
    expect(loader).toHaveStyle('margin-top: 20px');
  });
});