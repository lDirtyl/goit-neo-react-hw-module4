import toast from "react-hot-toast";


export default function SearchBar ({onSubmit})  {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const value = e.target.elements.query.value
        if (!value) {
            toast.error('⚠️ Please provide an image name!')
        } else {
            onSubmit(value)
        }
    }

  return (
    <header>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
