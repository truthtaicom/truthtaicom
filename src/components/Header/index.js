import React from 'react'
import Link from 'gatsby-link'
import { Container, Tabs, TabList, Tab, TabLink } from 'bloomer'

const AppHeader = () => (
  <Container>
    <Tabs isAlign="centered">
      <TabList>
        <Tab>
          <Link to="/">Home</Link>
        </Tab>
        <Tab>
          <Link to="/apps">Apps</Link>
        </Tab>
        <Tab>
          <Link to="/blog">Blog</Link>
        </Tab>
        <Tab>
          <Link to="/about">About</Link>
        </Tab>
      </TabList>
    </Tabs>
  </Container>
)

export default AppHeader