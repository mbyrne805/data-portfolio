import Socials from '@components/socials'
import ProjectList from '@components/projects'
import Link from '@components/link'
import AboutMe from '@components/aboutme'
import { getProjects } from '@lib/projects'
import styles from './page.module.css'
import TimeOfDay from './timer'
import { Suspense } from 'react'
import { PostListRSC } from '@components/posts-list/rsc'
import Posts from '@components/posts-list'

const PROJECT_COUNT = 3

export const revalidate = 10800

export default async function HomePage() {
  const projects = await getProjects()

  return (
    <>
      <div className={styles.heading}>
        <span className={styles.headingText}>
          <h1>Matt Byrne</h1>
          <h2>Software Developer</h2>
          <h2>Environmental Data Analyst</h2>
        </span>
        <Socials />
      </div>
      <h3 className={styles.secondHeading}>About me</h3>
      <AboutMe />
      <h3>My projects</h3>
      <ProjectList
        showYears={true}
        count={PROJECT_COUNT}
        projects={projects}
      />
      <h3>My posts</h3>
      <Suspense fallback={<Posts skeleton />}>
        <PostListRSC paginate={false} />
      </Suspense>
      <footer className={styles.footer}>
        <span>
          <Link href="/about">About this site</Link>
        </span>
        <TimeOfDay />
      </footer>
    </>
  )
}
