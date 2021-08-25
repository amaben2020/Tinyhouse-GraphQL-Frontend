import { useQuery } from '../../lib/api/useQuery';
import { useMutation } from '../../lib/api/useMutation';

import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
} from './types';
const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
mutation DeleteListing($id: ID!) {
  deleteListing(id: $id ) {
    id
  }
}
`;

interface Props {
  title: string;
}

const Listings = ({ title }: Props) => {
  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);

  const handleDeleteListings = async (id: string) => {
    await deleteListing({ id });
    refetch();
  };

  const listings = data ? data.listings : null;
  const listingsList = listings?.map((listing) => {
    return (
      <li key={listing.id}>
        <ul>
          {' '}
          {listing.title}
          <button onClick={() => handleDeleteListings(listing.id)}>
            Delete{' '}
          </button>
        </ul>
      </li>
    );
  });

  const deleteListingLoadingData = deleteListingLoading ? (
    <h4>Deletion in progress....</h4>
  ) : null;
  const deleteListingErrorData = deleteListingError ? (
    <h4>Error deleting ....</h4>
  ) : null;

  if (loading) {
    return <h2>Loading....</h2>;
  }

  //This covers the full UI since it is not inside the div
  if (error) {
    return <h3>Uh oh There is an error fetching data</h3>;
  }

  return (
    <div>
      {title}
      {listingsList}
      {deleteListingLoadingData}
      {deleteListingErrorData}
    </div>
  );
};

export default Listings;
