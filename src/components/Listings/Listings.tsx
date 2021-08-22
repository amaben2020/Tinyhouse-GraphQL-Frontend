import { server } from '../../lib/api/server';
import { useQuery } from '../../lib/api/useQuery';

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
  const { data, refetch, loading } = useQuery<ListingsData>(LISTINGS);

  const deleteListings = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    });
    refetch();
  };

  const listings = data ? data.listings : null;
  const listingsList = listings?.map((listing) => {
    return (
      <li key={listing.id}>
        <ul>
          {' '}
          {listing.title}
          <button onClick={() => deleteListings(listing.id)}>Delete </button>
        </ul>
      </li>
    );
  });

  if (loading) {
    return <h2>Loading....</h2>;
  }

  return (
    <div>
      {title}
      {listingsList}
    </div>
  );
};

export default Listings;
