import { CopyButton } from '@/components/CopyButton'
import { EmptyState } from '@/components/EmptyState'
import { GhCalendar } from '@/components/GhCalendar'
import { Spinner } from '@/components/Spinner'
import {
  DEFAULT_CLASSNAMES_RANK,
  renderRank,
} from '@/components/TableUser/column'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMostActiveUsers } from '@/lib/api'
import { formatNumber, makeInitial, shareToSocial } from '@/lib/utils'
import {
  ActivityIcon,
  ArrowLeftIcon,
  ExternalLink,
  GithubIcon,
  InfoIcon,
  Share2Icon,
  UserCheck2Icon,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export const Detail = () => {
  const { data, isLoading, isError } = useMostActiveUsers()
  const { username } = useParams()

  const [badgeType, setBadgeType] = useState<string>('markdown')
  const [styleType, setStyleType] = useState<string>('flat')

  if (isLoading)
    return (
      <div className="relative py-16 max-w-4xl mx-auto flex flex-col justify-center items-center gap-8 text-center">
        <Spinner />
      </div>
    )

  if (isError)
    return (
      <EmptyState title="Failed to fetch data statistics, please try again later!" />
    )

  const currentUser = data?.users?.find((u) => u.username === username)

  if (!currentUser) {
    return <EmptyState title={`Can not found username "${username}"!`} />
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
                DEFAULT_CLASSNAMES_RANK,
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

      <div className="relative max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            shareToSocial(currentUser)
          }}
        >
          <Share2Icon />
        </Button>
        <Button asChild variant="outline" size="icon">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <GithubIcon />
          </a>
        </Button>
        {username ? (
          <Button asChild variant="outline">
            <a
              href={`https://my-open-source-contributions.vercel.app/${username}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              See Contributions
              <ExternalLink />
            </a>
          </Button>
        ) : null}
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

      <div className="relative max-w-4xl mx-auto flex flex-col justify-center items-center gap-8">
        <h2 className="text-center scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Create your badge
        </h2>

        <div className="relative flex flex-col gap-4">
          <img
            src={`https://indogithubers-badge.vercel.app/badge?username=${username}&style=${styleType}`}
            alt="Preview Badge"
            loading="lazy"
          />

          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Select
                onValueChange={(newValue) => {
                  setBadgeType(newValue)
                }}
                defaultValue={badgeType}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="markdown">Markdown</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(newValue) => {
                  setStyleType(newValue)
                }}
                defaultValue={styleType}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flat">Flat</SelectItem>
                  <SelectItem value="flat-square">Flat Square</SelectItem>
                  <SelectItem value="for-the-badge">For The Badge</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="plastic">Plastic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CopyButton
              text={
                badgeType === 'markdown'
                  ? `![IndoGitHubers-badge](https://indogithubers-badge.vercel.app/badge?username=${username}&style=${styleType})`
                  : ` <img src="https://indogithubers-badge.vercel.app/badge?username=${username}&style=${styleType}" alt="IndoGitHubers Badge">`
              }
              fullWidth
              withInput={true}
              withLabel
            />
          </div>

          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Additional parameters</AlertTitle>
            <AlertDescription className="mt-2">
              <ul className="list-disc list-outside grid gap-1">
                <li>
                  <code className="bg-green-100 text-green-600 px-1 rounded font-mono">
                    style
                  </code>{' '}
                  values that you can use are: "social", "plastic", "flat",
                  "flat-square", "for-the-badge"
                </li>
                <li>
                  <code className="bg-green-100 text-green-600 px-1 rounded font-mono">
                    color
                  </code>{' '}
                  values that you can use, such as "red", "yellow", "00FF00",
                  "D3EB30", etc
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
