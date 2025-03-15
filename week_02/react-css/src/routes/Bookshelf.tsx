
import React from 'react'
import { useSearchParams } from 'react-router'

type Book = {
  title: string;
  isCompleted: boolean;
}

type Search = {
  title: string;
  isCompleted: boolean;
}

const bySearch = (search: Search) => (book: Book) => 
  book.title.toLocaleLowerCase().includes((search.title || '').toLocaleLowerCase()) &&
  book.isCompleted === search.isCompleted


export const Bookshelf = () => {
  const books = [
    {
      title: 'The road to React', isCompleted: true,
    },
    {
      title: 'The road to Next', isCompleted: false,
    }
  ]

  const [searchParams, setSearchParams] = useSearchParams()
  
  // searchParams.append('test', 'value')
  const titleFromQuery = searchParams.get('title') || '';
  const isCompletedFromQuery = searchParams.get('isCompleted') === 'true'

  const search: Search = {
    title: titleFromQuery,
    isCompleted: isCompletedFromQuery
  }

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value
    setSearchParams({
      title: newTitle,
      isCompleted: String(search.isCompleted)
    })
  }

  const handleIsCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIsCompleted = event.target.value
    setSearchParams({
      title: search.title,
      isCompleted: newIsCompleted
    })
  }

  const filteredBooks = books.filter(bySearch(search));

  return (
    <>
      <h2>Bookshelf</h2>

      <div className='mb-2'>
        <label>
          Title:
          <input
            type="text"
            value={search.title}
            onChange={handleTitle}
            className="
              ml-2
              px-2 py-1
              border
              border-gray-300
              rounded
              text-sm
              focus:outline-none
              focus:ring-2
              focus:border-transparent
            "
          />
        </label>
      </div>

      <div className='mb-2'>
        <label>
          Completed:
          <input
            type="checkbox"
            checked={search.isCompleted}
            onChange={handleIsCompleted}
            className="ml-2"
          />
        </label>
      </div>

      <ul>
        {filteredBooks.length > 0 ?
        filteredBooks.map(book => (
          <li key={book.title} className="text-blue-500">
            {book.title} {book.isCompleted ? "(Done)👍" : ""}
          </li>
        )) : (
          <li>No matching books</li>
        )          
        }
      </ul>
    </>
  )
}
