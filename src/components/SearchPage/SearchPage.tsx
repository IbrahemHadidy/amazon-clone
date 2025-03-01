import { initializeSearch, resetSearch } from '@features/search/searchSlice';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import SearchFilters from './SearchFilters';
import SearchResults from './SearchResults';
import { useAppDispatch } from '@app/hooks';

export default function SearchPage() {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const searchTitle = searchParams.get('q');
  const searchCategory = searchParams.get('category');

  useEffect(() => {
    document.title = 'Search';

    dispatch(initializeSearch({ searchTitle, searchCategory }));

    return () => {
      dispatch(resetSearch());
    };
  }, [dispatch, searchCategory, searchTitle]);

  return (
    <section className="m-4 flex flex-row gap-[10px] p-2">
      <SearchFilters />
      <SearchResults />
    </section>
  );
}
