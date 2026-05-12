import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar p-5">
      <span className='text-3xl font-extrabold'>NodeBlog</span>
      <ul>
        <li>Home</li>
        <li>Trending</li>
        <li>Bookmarks</li>
      </ul>
      <ul>
        <li>
            <Button />
            <Profile />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar