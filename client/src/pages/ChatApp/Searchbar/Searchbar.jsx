const Searchbar = () => {
  return (
    <div className="input-group rounded mb-3 px-lg-4 px-3">
      <input type="search" className="form-control rounded-0 
      rounded-start bg-transparent border text-light" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
      <span className="input-group-text border-0" id="search-addon">
        <i className="fas fa-search"></i>
      </span>
    </div>
  )
}

export default Searchbar