import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, string> {
  if (shouldSuccess) {
    return right('Operation was successful')
  } else {
    return left('Operation failed')
  }
}

test('success case', () => {
  const result = doSomething(true)

  expect(result.isRight()).toBe(true)
  expect(result.isLeft()).toBe(false)
})

test('failure case', () => {
  const result = doSomething(false)

  expect(result.isRight()).toBe(false)
  expect(result.isLeft()).toBe(true)
})
