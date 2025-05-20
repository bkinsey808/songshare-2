import { SafeAreaView } from 'react-native';
import clsx from 'clsx';

export const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <SafeAreaView className={clsx(styles.container, className)}>{children}</SafeAreaView>;
};

const styles = {
  container: 'flex flex-1 m-6',
};
