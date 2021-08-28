import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'graphql-tag';
import { Listings as ListingsData } from './__generated__/Listings';
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from './__generated__/DeleteListing';
import { List, Avatar, Button, Spin } from 'antd';
import './styles/listings.css';
import {
  ListingsAlert,
  ListingsSkeleton,
} from './../Listings/components/index';

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
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => handleDeleteListings(listing.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={listing.image} shape="square" size={78} />}
            title={listing.title}
            description={listing.address}
          />
        </List.Item>
      )}
    />
  ) : null;

  const deleteListingErrorData = deleteListingError ? (
    <ListingsAlert errorMessage="Cannot be deleted, try again" error />
  ) : null;

  if (loading) {
    return <ListingsSkeleton title={title} />;
  }

  if (error) {
    return (
      <div className="listings__alert">
        <ListingsSkeleton title={title} error />
      </div>
    );
  }

  return (
    <div className="listings">
      <Spin spinning={deleteListingLoading}>
        {title}
        {listingsList}
        {deleteListingErrorData}
      </Spin>
    </div>
  );
};

export default Listings;
