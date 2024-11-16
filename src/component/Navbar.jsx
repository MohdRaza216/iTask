const Navbar = () => {
  return (
    <nav className='flex justify-around py-2 text-white bg-indigo-900'>
        <div className="logo">
            <span className='mx-8 text-xl font-bold'>iTask</span>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className='transition-all cursor-pointer hover:font-bold'>Home</li>
        <li className='transition-all cursor-pointer hover:font-bold'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar