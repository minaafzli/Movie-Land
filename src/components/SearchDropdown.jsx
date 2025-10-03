import { Link } from "react-router-dom";

export default function SearchDropdown({ results = [], loading }) {

  
  return (<>
    
    <div className="absolute left-0 right-0 mt-2 m-2 bg-bgGray border border-muted rounded-lg shadow-lg z-50 max-h-80 overflow-auto">
      {loading ? (
        // skeletons
        <div  className="p-4 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-12 h-16 bg-gray-700 rounded" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-600 rounded w-3/4" />
                <div className="h-3 bg-gray-600 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <div className="p-4 text-sm text-muted">No results found.</div>
      ) : (
        <ul className="divide-y divide-muted">
          {results.map((m) => (
            <li key={m.imdbID}>
              <Link
                to={`/movieDetails/${m.imdbID}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted/20"
              >
                <img
                  src={m.Poster !== "N/A" ? m.Poster : "/placeholder.png"}
                  alt={m.Title}
                  className="w-12 h-16 object-cover rounded"
                />
                <div>
                  <div className="text-sm font-semibold">{m.Title}</div>
                  <div className="text-xs text-gray-400">{m.Year}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  
    </>
  );
}
