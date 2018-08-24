import React from 'react'
import Helmet from 'react-helmet'

import 'font-awesome/css/font-awesome.css'
import "bulma/css/bulma.css"

import {
  Container,
  Hero,
  HeroHeader,
  HeroBody,
  HeroFooter,
  Tabs,
  TabList,
  Tab,
  TabLink,
} from 'bloomer'
import AppHeader from '../Header'
import AppFooter from '../Footer'

export default ({ children }) => (
  <div>
    <Hero isFullHeight isColor="white">
      <HeroHeader>
        <AppHeader />
      </HeroHeader>

      <HeroBody>{children}</HeroBody>

      <HeroFooter>
        <Container>
          <Tabs isAlign="centered">
            <TabList>
              <Tab>
                <TabLink>And this at the bottom</TabLink>
              </Tab>
            </TabList>
          </Tabs>
        </Container>
      </HeroFooter>
    </Hero>
    <AppFooter />
  </div>
)