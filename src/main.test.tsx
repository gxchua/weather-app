import * as ReactDOMClient from 'react-dom/client';
import '@testing-library/jest-dom';

const renderMock = jest.fn();

jest.mock('react-dom/client', () => ({
    ...jest.requireActual('react-dom/client'),
    createRoot: jest.fn(() => ({
        render: renderMock,
    })),
}));

describe('main.tsx', () => {
    it('renders without error', () => {
        const div = document.createElement('div');
        document.getElementById = jest.fn(() => div);
        
        require('./main');  // Triggers the React render

        expect(ReactDOMClient.createRoot).toHaveBeenCalled();
        expect(renderMock).toHaveBeenCalled();
    });
});
