import { Slug } from './slug'

describe('Slug Value Object', () => {
  it('should create a slug from a text', () => {
    const text = 'An Example Question'
    const slug = Slug.createFromText(text)

    expect(slug.value).toBe('an-example-question')
  })

  it('should handle special characters and spaces', () => {
    const text = 'A Question with Special Characters! @#&*()'
    const slug = Slug.createFromText(text)

    expect(slug.value).toBe('a-question-with-special-characters')
  })

  it('should remove leading and trailing hyphens', () => {
    const text = '  Leading and Trailing Hyphens - '
    const slug = Slug.createFromText(text)

    expect(slug.value).toBe('leading-and-trailing-hyphens')
  })
})
