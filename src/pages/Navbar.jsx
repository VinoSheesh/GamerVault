function Navbar(){

    return(
      <header className="flex justify-between">
        <h1>My Website</h1>
        <nav className="flex items-center justify-center w-full">
          <ul className="flex items-center justify-between gap-8">
            <li><a href="" className="text-red-600">Home</a></li>
            <li><a href="">About</a></li>
            <li><a href="">Service</a></li>
            <li><a href="">Contact</a></li>
          </ul>
        </nav>
        <button>Sign Up</button>
      </header>
    );
  }
  
  export default Navbar