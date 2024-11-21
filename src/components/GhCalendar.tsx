import GitHubCalendar from 'react-github-calendar';
import { useTheme } from './theme-provider';

export const GhCalendar = ({ username }: { username: string }) => {
  const { theme } = useTheme();

  return (
    <GitHubCalendar
      username={username}
      blockSize={16}
      colorScheme={theme === 'system' ? undefined : theme}
    />
  );
};
