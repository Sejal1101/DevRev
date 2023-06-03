// const BookApi = {
//   getAllBooks: async () => {
//     const res = await fetch("/v1/book", { method: "GET" })
//     return res.json()
//   },
//   getBookByIsbn: async (bookIsbn) => {
//     const res = await fetch(`/v1/book/${bookIsbn}`, { method: "GET" })
//     return res.json()
//   },
//   addBook: async (data) => {
//     const res = await fetch("/v1/book", {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: { "Content-Type": "application/json" },
//     })
//     return res.json()
//   },
//   patchBookByIsbn: async (bookIsbn, data) => {
//     const res = await fetch(`/v1/book/${bookIsbn}`, {
//       method: "PATCH",
//       body: JSON.stringify(data),
//       headers: { "Content-Type": "application/json" },
//     })
//     return res.json()
//   },
//   deleteBook: async (bookIsbn) => {
//     const res = await fetch(`/v1/book/${bookIsbn}`, { method: "DELETE" })
//     return res.json()
//   },
// }

// module.exports = { BookApi }


const BookApi = {
  getAllBooks: async (page = 1, limit = 10) => {
    const res = await fetch(`/v1/book?page=${page}&limit=${limit}`, { method: "GET" });
    return res.json();
  },
  getBookByIsbn: async (bookIsbn) => {
    const res = await fetch(`/v1/book/${bookIsbn}`, { method: "GET" });
    return res.json();
  },
  addBook: async (data) => {
    const res = await fetch("/v1/book", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  },
  patchBookByIsbn: async (bookIsbn, data) => {
    const res = await fetch(`/v1/book/${bookIsbn}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  },
  deleteBook: async (bookIsbn) => {
    const res = await fetch(`/v1/book/${bookIsbn}`, { method: "DELETE" });
    return res.json();
  },
  getFilteredBooks: async (filters) => {
    const res = await fetch(`/v1/book/filter`, {
      method: "POST",
      body: JSON.stringify(filters),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  },
  getCountByCriteria: async (criteria) => {
    const res = await fetch(`/v1/book/count?criteria=${criteria}`, { method: "GET" });
    return res.json();
  },
};

module.exports = { BookApi };
