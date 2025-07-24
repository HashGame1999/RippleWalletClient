import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function AboutPage() {
  const content = `
# Ripple Wallet Client

A full function ripple wallet client with very small size.

## Running
1. npm install
2. npm run tauri dev

## Build
1. npm run tauri build

## Donate
- Ripple: rBoy4AAAAA9qxv7WANSdP5j5y59NP6soJS
`
  return (
    <div className="p-1 mt-8">
      <div className="flex flex-col mx-auto w-full p-4 border-2 border-indigo-500 rounded-lg bg-yellow-100 dark:bg-yellow-200 text-left">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-4xl font-bold my-4" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-3xl font-semibold my-3" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-xl font-semibold my-3" {...props} />
            ),
            ul({ depth, ordered, className, children, ...props }) {
              return (
                <ul
                  className={`list-disc pl-6 ${className}`}
                  style={{ paddingLeft: depth * 20 + 'px' }}
                  {...props}
                >
                  {children}
                </ul>
              );
            },
            ol({ depth, ordered, className, children, ...props }) {
              return (
                <ol
                  className={`list-decimal pl-6 ${className}`}
                  style={{ paddingLeft: depth * 20 + 'px' }}
                  {...props}
                >
                  {children}
                </ol>
              );
            },
            li({ className, children, ...props }) {
              return (
                <li className={`mb-2 ${className}`} {...props}>
                  {children}
                </li>
              );
            }
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  )
}