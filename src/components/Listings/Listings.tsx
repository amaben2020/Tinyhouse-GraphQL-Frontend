// import { useQuery } from '../../lib/api/useQuery';
// import { useMutation } from '../../lib/api/useMutation';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
// import {
//   ListingsData,
//   DeleteListingData,
//   DeleteListingVariables,
// } from './types';
import { Listings as ListingsData } from './__generated__/Listings';
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from './__generated__/DeleteListing';
import { List, Avatar } from 'antd';
import './styles/listings.css';
const LISTINGS = gql`
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

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
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
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={listing.image} shape="square" size={78} />}
            title={listing.title}
            description={listing.address}
          />
        </List.Item>
      )}
    />
  ) : null;
  // const listingsList = listings?.map((listing) => {
  //   return (
  //     <li key={listing.id}>
  //       <ul>
  //         {' '}
  //         {listing.title}
  //         <button onClick={() => handleDeleteListings(listing.id)}>
  //           Delete{' '}
  //         </button>
  //       </ul>
  //     </li>
  //   );
  // });

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
    <div className="listings">
      {title}
      {listingsList}
      {deleteListingLoadingData}
      {deleteListingErrorData}
    </div>
  );
};

export default Listings;
