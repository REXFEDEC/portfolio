'use client'

interface MetadataBlockProps {
  metadata: Record<string, string>
}

export function MetadataBlock({ metadata }: MetadataBlockProps) {
  return (
    <div className="border border-border rounded-lg p-6 bg-card mb-6">
      <div className="space-y-4">
        {Object.entries(metadata).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-1">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{key}</dt>
            <dd className="text-foreground">
              {value.split(' · ').map((part, idx) => (
                <div key={idx}>
                  {part.startsWith('[') ? (
                    part
                      .match(/\[([^\]]+)\]\(([^\)]+)\)/g)
                      ?.map((match, i) => {
                        const [, text, url] = match.match(/\[([^\]]+)\]\(([^\)]+)\)/) || []
                        return (
                          <a
                            key={i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:underline"
                          >
                            {text}
                          </a>
                        )
                      }) || part
                  ) : (
                    part
                  )}
                </div>
              ))}
            </dd>
          </div>
        ))}
      </div>
    </div>
  )
}
