// search.js

export const searchBooks = (books, filter) => {
  return books.filter((book) => {
    const { title, author, subject, price } = book;

    // Check if any of the book properties contain the search value
    return (
      title.toLowerCase().includes(filter.toLowerCase()) ||
      author.toLowerCase().includes(filter.toLowerCase()) ||
      subject.toLowerCase().includes(filter.toLowerCase()) ||
      price.toString().includes(filter.toLowerCase())
    );
  });
};
