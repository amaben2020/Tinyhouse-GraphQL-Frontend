import React from 'react';
import { Alert, Skeleton, Divider } from 'antd';

interface IProps {
  title: string;
  error?: boolean;
}
export const ListingsSkeleton = ({ title, error = false }: IProps) => {
  const myError = error ? (
    <Alert type="error" message="Something went wrong" />
  ) : null;
  return (
    <div className="">
      <h2>{title}</h2>
      {myError}
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
      <Divider />
      <Skeleton active paragraph={{ rows: 1 }} />
    </div>
  );
};
