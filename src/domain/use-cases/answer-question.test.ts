import { AnswerQuestionUseCase } from "./answer-question";
import { AnswerRepository } from "../repositories/answer-repositories";
import { Answer } from "../entities/answer";

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {
    // Simulate saving the answer
    return Promise.resolve();
  }
};

describe("AnswerQuestionUseCase", () => {
  it("should create an answer for a question", async () => {
    const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswerRepository)

    const answer = await answerQuestionUseCase.execute({
      instructorId: "instructor-1",
      questionId: "question-1",
      content: "This is an answer to the question.",
    });

    expect(answer.content).toBe('This is an answer to the question.');
  });
})