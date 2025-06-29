export class Slug {
  public value: string;

  constructor(value: string) {
    this.value = value
  }

  /**
   * Receives a string and returns a slugified version of it.
   * 
   * Example: "An Example Question" becomes "an-example-question"
   * 
   * @param text {string}
   */
  static createFromText(text: string) {
    const slug = text
      .normalize("NFKD") // Normalize the string to remove accents
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]+/g, "") // Remove special characters except hyphens and alphanumeric characters
      .replace(/_/g, "-") // Replace underscores with hyphens
      .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/-$/g, ""); // Remove leading and trailing hyphens
      // .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens

    return new Slug(slug);
  }
}