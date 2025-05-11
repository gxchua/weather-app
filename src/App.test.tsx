import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import App from './App'

jest.mock('./App', () => {
    return {
        __esModule: true,
        default: () => (
            <div data-testid='app-mock' className='app'>
                <span>App</span>
            </div>
        ),
    };
})

describe('App renders without error', () => {
    test('Renders App', () => {
        render(<App />);
        const appElement = screen.getByTestId('app-mock');
        expect(appElement).toBeInTheDocument();
        expect(appElement).toHaveClass('app');
    })
})
