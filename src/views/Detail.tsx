import { EmptyState } from '@/components/EmptyState';
import { GhCalendar } from '@/components/GhCalendar';
import { Spinner } from '@/components/Spinner';
import { DEFAULT_CLASSNAMES_RANK, renderRank } from '@/components/TableUser/column';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useMostActiveUsers } from '@/lib/api';
import { formatNumber, makeInitial } from '@/lib/utils';
import {
  ActivityIcon,
  ArrowLeftIcon,
  ExternalLink,
  Share2Icon,
  UserCheck2Icon,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

export const Detail = () => {
  const { data, isLoading, isError } = useMostActiveUsers();
  const { username } = useParams();

  if (isLoading)
    return (
      <div className="relative py-16 max-w-4xl mx-auto flex flex-col justify-center items-center gap-8 text-center">
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <EmptyState title="Failed to fetch data statistics, please try again later!" />
    );

  const currentUser = data?.users?.find((u) => u.username === username);

  if (!currentUser) {
    return <EmptyState title={`Can not found username "${username}"!`} />;
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/">
          <ArrowLeftIcon /> Back to Homepage
        </Link>
      </Button>
      <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center gap-2">
        <div className="relative h-24 w-24 bg-transparent rounded-full flex items-center justify-center flex-col">
          <Avatar className="h-20 w-20 bg-primary-foreground z-[1]">
            <AvatarImage src={currentUser?.avatarUrl} />
            <AvatarFallback>
              {makeInitial(currentUser?.name || username || '')}
            </AvatarFallback>
          </Avatar>
          <span className="animate-ping absolute inline-flex h-14 w-14 rounded-full bg-sky-400 opacity-75" />
        </div>
        <div className="text-center">
          <h1 className="text-center scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            {currentUser.name}
          </h1>
          <p className="text-muted-foreground">@{currentUser?.username}</p>
        </div>
      </div>
      <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center gap-2">
        <div className="flex justify-between gap-8">
          <div className="flex flex-col gap-1 items-center">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <ActivityIcon className="h-4 w-4" />
              Contributions
            </span>
            <div className="flex items-center gap-1">
              {renderRank(
                currentUser?.contributionRank,
                DEFAULT_CLASSNAMES_RANK
              )}{' '}
              • {formatNumber(currentUser?.contributions)}
            </div>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <UserCheck2Icon className="h-4 w-4" />
              Followers
            </span>
            <div className="flex items-center gap-1">
              {renderRank(currentUser?.followerRank, DEFAULT_CLASSNAMES_RANK)} •{' '}
              {formatNumber(currentUser?.followers)}
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto flex justify-center items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const tweetText = `Hey X, here are my GitHub stats:\n\nUsername: ${currentUser.username}\n\n🏅\nFollowers Rank: #${currentUser.followerRank}\nContribution Rank: #${currentUser.contributionRank}\n\n🏆\nTotal Followers: ${currentUser.followers}\nTotal Contribution: ${currentUser.contributions}\n\nGo check yours at https://indogithubers.vercel.app/u/${username} #IndoGitHubers`;
            const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              tweetText
            )}`;
            window.open(url, '_blank');
          }}
        >
          Share Profile
          <Share2Icon />
        </Button>
        {username ?
          <Button asChild variant="outline" size="sm">
            <a
              href={`https://my-open-source-contributions.vercel.app/${username}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              See Contributions
              <ExternalLink />
            </a>
          </Button> 
        : null}
        <Button asChild variant="outline" size="sm">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            Visit GitHub
            <ExternalLink />
          </a>
        </Button>
      </div>

      <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center gap-2 py-4">
        <GhCalendar username={username || ''} />
      </div>

      <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center gap-4 py-4">
        <img
          src={`https://github-profile-trophy.vercel.app/?username=${username}&theme=algolia&margin-w=5&margin-h=5`}
          alt="Github Trophy"
          className="h-auto w-full"
          loading="lazy"
        />
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=algolia`}
            alt="Stat Streak"
            loading="lazy"
            className="h-auto w-full md:w-[calc(50%-0.5rem)]"
          />
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=algolia&count_private=true&line_height=27`}
            alt="Github Stats"
            loading="lazy"
            className="h-auto w-full md:w-[calc(50%-0.5rem)]"
          />
        </div>
      </div>
    </div>
  );
};
