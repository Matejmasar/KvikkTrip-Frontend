import {vi} from 'vitest';
import {fireEvent, render, screen, act, waitFor} from "@testing-library/react";
import HelpPopup from "../src/components/HelpPopup.jsx";
import {AIHelp} from "../src/services/apiservice.js";

vi.mock("../src/services/apiservice.js", () => ({
    AIHelp: vi.fn(() => "This is the answer")
}));

let questionInput, questionButton, answerField;
beforeEach(() => {
   render(<HelpPopup/>);

   questionInput = screen.getByPlaceholderText("Question");
   questionButton = screen.getByRole('button', {name: 'Ask question'});

   AIHelp.mockClear();
});

describe('Help popup', () => {
    it('should render correctly', () => {
        expect(questionInput).toBeInTheDocument();
        expect(questionButton).toBeInTheDocument();
    });
    it('should be possible to ask questions with button', async () => {
        act(() => {
            fireEvent.change(questionInput, {target: {value: 'test question'}});
            fireEvent.click(questionButton);
        });
        expect(AIHelp).toHaveBeenCalled();

        await waitFor(() => {
            answerField = screen.getByText('This is the answer');
            expect(answerField).toBeInTheDocument();
        });
    });
    it('should be possible to ask questions with key', () => {
        act(() => {
            fireEvent.change(questionInput, {target: {value: 'test question'}});
            fireEvent.keyDown(questionInput, {key: 'Enter'});
        });
        expect(AIHelp).toHaveBeenCalled();
    })
});