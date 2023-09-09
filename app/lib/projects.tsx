import type { Project } from './types'
import { cache } from 'react'
const Projects: Project[] = [
  {
    title: 'Possum Portal',
    description: 'Environmental social media and web mapping application',
    href: 'https://github.com/mbyrne510/PossumPortal',
    role: 'Creator',
    years: ['2022'],
  },
]

export const getProjects = cache(async (): Promise<Project[]> => {
  // if (!process.env.GITHUB_TOKEN) {
  //   throw new Error(
  //     'No GITHUB_TOKEN provided. Generate a personal use token on GitHub.'
  //   )
  // }

  const withStars = await Promise.all(
    Projects.map(async (proj) => {
      const split = proj.href.split('/')
      if (split[2] === 'github.com') {
        const user = split[3]
        const repo = split[4]
        const fetchUrl =
          process.env.NODE_ENV === 'production'
            ? `https://api.github.com/repos/${user}/${repo}`
            : 'http://localhost:3000/mock-stars-response.json'
        const { stargazers_count, message } = await (
          await fetch(fetchUrl, {
            headers: {
              Authorization: process.env.GITHUB_TOKEN ?? '',
            },
            cache: 'force-cache'
          })
        ).json()

        // rate limited
        if (!stargazers_count && message) {
          console.warn(`Rate limited or error: ${message}`)
          return proj
        }

        return {
          ...proj,
          stars: stargazers_count,
        }
      }
      return proj
    })
  )

  return withStars
})
