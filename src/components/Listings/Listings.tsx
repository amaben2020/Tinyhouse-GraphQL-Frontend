import React from 'react';
import { server } from '../../lib/api/server';

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
      rating
    }
  }
`;

interface Props {
  title: string;
}

const Listings = ({ title }: Props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch({ query: LISTINGS });
    console.log(data);
  };
  return (
    <div>
      {title}
      <button onClick={fetchListings}>Query Listings</button>
    </div>
  );
};

export default Listings;
