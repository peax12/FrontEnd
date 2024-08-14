import React, { useEffect, useState } from 'react';


const apiUrl = 'https://final-project-6ecw.onrender.com'

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
  
    fetch(`${apiUrl}/book`)
      .then((response) => response.json())
      .then((data) => setBooks(data.books))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`${apiUrl}/book/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Book deleted') {
          setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        }
      })
      .catch((error) => console.error('Error deleting book:', error));
  };

  return (
    <div className="container">
      <h1>Book List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
