import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase";

const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendEmailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit feedback', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Example Comment",
            screenshot: "data:image/png;base64,secaoiyoiaycdskjsdhgcisudhflkszyrgiureyt"
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendEmailSpy).toHaveBeenCalled();
    })

    it('should not be able to submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: "",
            comment: "Example Comment",
            screenshot: "data:image/png;base64,secaoiyoiaycdskjsdhgcisudhflkszyrgiureyt"
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "data:image/png;base64,secaoiyoiaycdskjsdhgcisudhflkszyrgiureyt"
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback with a invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "Example Comment",
            screenshot: "123"
        })).rejects.toThrow();
    })
})