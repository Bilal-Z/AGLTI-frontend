import React, { useContext, useState } from 'react';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import {
  Redirect,
  Switch,
  BrowserRouter as Route,
  useRouteMatch,
} from 'react-router-dom';
import { DashboardSideNav } from '../../components/layout/DashboardSideNav';
import { AuthContext } from '../../context/auth';
import { DashboardProvider } from '../../context/dashboard';
import { ProfileArea } from '../../components/dashboard/ProfileArea';
import { AppliedArea } from '../../components/dashboard/AppliedArea';
import { OffersArea } from '../../components/dashboard/OffersArea';

export const Dashboard = () => {
  const context = useContext(AuthContext);
  const { path } = useRouteMatch();

  const [projectEnrolled, setProjectEnrolled] = useState(false);

  if (!context.profile) {
    return <Redirect to="/createprofile" />;
  }

  if (projectEnrolled) {
    return <Redirect to="/projectdashboard" />;
  }

  return (
    <DashboardProvider>
      <Box>
        <Grid templateColumns={{ md: '250px auto', sm: '70px auto' }}>
          <GridItem>
            <DashboardSideNav />
          </GridItem>
          <GridItem>
            <Box maxW="container.xl" px={10} pt={2} mx="auto">
              <Switch>
                <Route exact path={path}>
                  <ProfileArea />
                </Route>
                <Route exact path={`${path}/applied`}>
                  <AppliedArea />
                </Route>
                <Route exact path={`${path}/offers`}>
                  <OffersArea setProjectEnrolled={setProjectEnrolled} />
                </Route>
              </Switch>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </DashboardProvider>
  );
};
