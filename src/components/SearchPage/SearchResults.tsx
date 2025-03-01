import { setPage } from '@features/search/searchSlice';
import { updateSearchResults } from '@features/search/searchThunks';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchResult from './SearchResult';
import { useAppDispatch, useAppSelector } from '@app/hooks';

function LoadingResults() {
  return (
    <div className="flex w-full items-center justify-center gap-2 py-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#FFA41C]" />
      <span className="text-lg font-medium text-gray-700">
        Loading results...
      </span>
    </div>
  );
}

export default function SearchResults() {
  const dispatch = useAppDispatch();

  const { isFetchDisabled, page, hasMoreResults, results } = useAppSelector(
    (state) => state.search
  );

  const handleNextItems = async () => {
    if (!isFetchDisabled) {
      dispatch(setPage(page + 1));
      await dispatch(updateSearchResults());
    }
  };

  return (
    <main>
      <InfiniteScroll
        className={`flex flex-wrap content-start items-start gap-3 max-md:justify-center ${isFetchDisabled ? 'pointer-events-none opacity-50' : ''}`}
        dataLength={results.length}
        next={handleNextItems}
        hasMore={hasMoreResults}
        loader={<LoadingResults />}
        endMessage={
          <h3 className="w-full text-center text-lg font-medium text-gray-700">
            {results.length === 0 ? 'No results found.' : 'No more results.'}
          </h3>
        }
      >
        {results.map((item) => (
          <SearchResult key={item.id} data={item} />
        ))}
      </InfiniteScroll>
    </main>
  );
}
