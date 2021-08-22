import React from 'react';
import { server } from '../../lib/api/server';
import { useQuery } from '../../lib/api/useQuery';

import {
  ListingsData,
  DeleteListingData,
  DeleteListingVariables,
  Listing,
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
  const { data } = useQuery<ListingsData>(LISTINGS);

  const deleteListings = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id,
      },
    });
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

  return (
    <div>
      {title}
      {listingsList}
    </div>
  );
};

export default Listings;
