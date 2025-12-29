import { AppConfig } from '@/utils/AppConfig';

export const Logo = (props: {
  isTextHidden?: boolean;
}) => (
  <div className="flex items-center text-xl font-bold">
    <span className="text-2xl font-bold text-gray-800">
      {AppConfig.name}
    </span>
    {!props.isTextHidden && (
      <span className="ml-1 text-sm font-normal text-gray-600">.com</span>
    )}
  </div>
);
