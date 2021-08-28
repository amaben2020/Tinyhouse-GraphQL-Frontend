import { Alert } from 'antd';

interface IProps {
  errorMessage: string;
  error?: boolean;
}
export const ListingsAlert = ({ errorMessage, error }: IProps) => {
  return (
    <div>
      <Alert message={errorMessage} />
    </div>
  );
};
