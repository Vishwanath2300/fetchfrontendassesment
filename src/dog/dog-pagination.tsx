interface DogPaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    maxPages: number;
    total: number;
    topPage:boolean;
}

// DogPagination component
// This component is used to paginate the dog list
function DogPagination(props: DogPaginationProps) {
  return (
    <div className="mt-6 flex justify-between items-center w-full">
        <button
          onClick={() => props.setPage((prev) => Math.max(prev - 1, 0))}
          disabled={props.page === 0}
          className="text-black bg-[#e1e7e1] focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 shadow-lg hover:bg-yellow-500 rounded-4xl">
           Previous
        </button>
        {(props.topPage)?
        <span>
        </span>: <span>Page {props.page + 1} of {props.maxPages} ({props.total} dogs)</span>}
        <button
          onClick={() => props.setPage((prev) => prev + 1)}
          disabled={props.page >= props.maxPages - 1}
          className="text-black bg-[#e1e7e1] focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 shadow-lg hover:bg-yellow-500 rounded-4xl"
        >
          Next
        </button>
    </div>
  );
}

export default DogPagination;