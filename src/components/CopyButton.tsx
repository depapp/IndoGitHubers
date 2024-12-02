'use client'

import { copyTextToClipboard } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

export function CopyButton({
  text,
  withLabel = false,
  withInput = false,
  fullWidth = false,
}: {
  text: string
  withLabel?: boolean
  withInput?: boolean
  fullWidth?: boolean
}) {
  const [isCopied, setIsCopied] = useState(false)

  return (
    <div className={`flex gap-2 ${fullWidth ? 'w-full' : ''}`}>
      {withInput ? <Input value={text} readOnly /> : null}

      <Button
        variant="outline"
        className="flex gap-2 items-center"
        type="button"
        disabled={isCopied}
        data-copied={`${isCopied}`}
        onClick={() => {
          setIsCopied(true);
          copyTextToClipboard(`${text}`);

          setTimeout(() => {
            setIsCopied(false);
          }, 3000);
        }}
      >
        {isCopied ? (
          <Check className="h-4 w-4 shrink-0 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 shrink-0" />
        )}
        {withLabel ? (
          <>{isCopied ? <span>Copied</span> : <span>Copy</span>}</>
        ) : null}
      </Button>
    </div>
  );
}
